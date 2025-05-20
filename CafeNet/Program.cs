using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Middleware;
using CafeNet.Business_Management.Services;
using CafeNet.Data.Database;
using CafeNet.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Serilog;
using Castle.DynamicProxy;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Infrastructure.Swagger;
using CafeNet.Infrastructure.Extensions;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];

builder.Host.UseSerilog();

builder.Configuration.AddJsonFile("demo-data.json", optional: false, reloadOnChange: true);

builder.Configuration.AddJsonFile("secrets.json", optional: true, reloadOnChange: true);

// Add services to the container.

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IProxyGenerator, ProxyGenerator>();
builder.Services.AddSingleton<LoggingInterceptor>();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "CafeNet API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new()
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });

    // Enable use of [Authorize] attributes in Swagger
    options.OperationFilter<AuthorizeCheckOperationFilter>();
});

builder.Services.AddDbContext<CafeNetDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"))
    );

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();

builder.Services.AddInterceptedService<IAuthService, AuthService>();
builder.Services.AddInterceptedService<IUserService, UserService>();
builder.Services.AddInterceptedService<ILocationService, LocationService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CafeNetDbContext>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

    context.Database.Migrate();

    if (app.Environment.IsDevelopment())
    {
        DbSeeder.SeedLocations(context, config);
        DbSeeder.SeedAdminUsers(context, config);
        DbSeeder.SeedBaristaUsers(context, config);
    }
}

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
