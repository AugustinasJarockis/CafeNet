using Castle.DynamicProxy;
using System.Security.Claims;

namespace CafeNet.Business_Management.Interceptors;

public class LoggingInterceptor : IInterceptor
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<LoggingInterceptor> _logger;
    private readonly bool _isLoggingEnabled;

    public LoggingInterceptor(
        IHttpContextAccessor httpContextAccessor,
        ILogger<LoggingInterceptor> logger,
        IConfiguration config)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
        _isLoggingEnabled = config.GetValue<bool>("Logging:LoggingOptions:EnableBusinessLogging", true);
    }

    public void Intercept(IInvocation invocation)
    {
        var method = invocation.MethodInvocationTarget ?? invocation.Method;
        var isLoggable = method.IsDefined(typeof(LoggableAttribute), true) ||
                         method.DeclaringType?.IsDefined(typeof(LoggableAttribute), true) == true;

        if (!_isLoggingEnabled || !isLoggable)
        {
            invocation.Proceed();
            return;
        }

        var user = _httpContextAccessor.HttpContext?.User;
        var username = user?.Identity?.Name ?? "Anonymous";
        var roles = string.Join(",", user?.FindAll(ClaimTypes.Role).Select(r => r.Value) ?? []);
        var methodName = $"{method.DeclaringType?.FullName}.{method.Name}";
        var timestamp = DateTime.UtcNow;

        _logger.LogInformation("Executing {Method} by user {User} with roles [{Roles}] at {Timestamp}",
            methodName, username, roles, timestamp);

        invocation.Proceed();

        _logger.LogInformation("Executed {Method}", methodName);
    }
}
