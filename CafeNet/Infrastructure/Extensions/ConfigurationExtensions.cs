namespace CafeNet.Infrastructure.Extensions;

public static class ConfigurationExtensions
{
    public static string GetRequiredConfigValue(this IConfigurationSection section, string key)
    {
        var value = section[key];
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException($"Missing required configuration key: '{key}' in section '{section.Path}'");
        }

        return value;
    }
}
