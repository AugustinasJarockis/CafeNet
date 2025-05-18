using CafeNet.Business_Management.Interceptors;
using Castle.DynamicProxy;

namespace CafeNet.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInterceptedService<TInterface, TImplementation>(
        this IServiceCollection services)
        where TInterface : class
        where TImplementation : class, TInterface
    {
        services.AddSingleton<ProxyGenerator>();
        services.AddSingleton<LoggingInterceptor>();
        services.AddTransient<TImplementation>();

        services.AddTransient<TInterface>(provider =>
        {
            var target = provider.GetRequiredService<TImplementation>();
            var generator = provider.GetRequiredService<ProxyGenerator>();
            var interceptor = provider.GetRequiredService<LoggingInterceptor>();
            return generator.CreateInterfaceProxyWithTarget<TInterface>(target, interceptor);
        });

        return services;
    }
}
