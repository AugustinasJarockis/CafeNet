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
using CafeNet.Business_Management.Interfaces.Workflows;
using CafeNet.Business_Management.Services.Workflows;
using Amazon.SimpleNotificationService;
using Amazon;
using CafeNet.BusinessManagement.Interfaces;
using CafeNet.BusinessManagement.Services;
using Stripe;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];

StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

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

builder.Services.AddScoped<IDiscountRepository, DiscountRepository>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<IMenuItemRepository, MenuItemRepository>();
builder.Services.AddScoped<IMenuItemVariationRepository, MenuItemVariationRepository>();
builder.Services.AddScoped<ITaxRepository, TaxRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IOrderItemVariationRepository, OrderItemVariationRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();


builder.Services.AddInterceptedService<IAuthService, AuthService>();
builder.Services.AddInterceptedService<IDiscountService, CafeNet.Business_Management.Services.DiscountService>();
builder.Services.AddInterceptedService<ILocationService, LocationService>();
builder.Services.AddInterceptedService<IMenuItemService, MenuItemService>();
builder.Services.AddInterceptedService<ITaxService, CafeNet.Business_Management.Services.TaxService>();
builder.Services.AddInterceptedService<IUserService, UserService>();
builder.Services.AddInterceptedService<IOrderService, OrderService>();
builder.Services.AddInterceptedService<IPaymentService, PaymentService>();
builder.Services.AddInterceptedService<IPaymentWorkflowService, PaymentWorkflowService>();

builder.Services.AddSingleton<IAmazonSimpleNotificationService>(sp =>
{
    return new AmazonSimpleNotificationServiceClient(
        builder.Configuration["Aws:AccessKey"],
        builder.Configuration["Aws:SecretKey"],
        new AmazonSimpleNotificationServiceConfig
        {
            RegionEndpoint = RegionEndpoint.GetBySystemName(builder.Configuration["Aws:Region"])
        }
    );
});

var notificationSenderType = builder.Configuration["NotificationSender"] ?? "AWS";
var useMessageTextDecorator = bool.TryParse(builder.Configuration["UseMessageTextDecorator"], out var decorator) && decorator;

if (notificationSenderType == "Noop")
{
    builder.Services.AddScoped<INotificationSender, NoopNotificationSender>();
}
else
{
    builder.Services.AddScoped<INotificationSender, AwsNotificationSender>();
}

if (useMessageTextDecorator)
{
    builder.Services.Decorate<INotificationSender, MessageTextDecorator>();
}

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
        DbSeeder.SeedCustomers(context, config);
        DbSeeder.SeedTaxes(context, config);
        DbSeeder.SeedMenuItems(context, config);
        DbSeeder.SeedMenuItemVariations(context, config);
        DbSeeder.SeedDiscounts(context, config);
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
