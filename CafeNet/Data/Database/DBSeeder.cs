using CafeNet.Data.Enums;
using CafeNet.Data.Models;

namespace CafeNet.Data.Database;

public static class DbSeeder
{
    public static void SeedAdminUser(CafeNetDbContext context, IConfiguration config)
    {
        var adminSection = config.GetSection("SeedData:AdminUser");

        var name = adminSection["Name"];
        var username = adminSection["Username"];
        var password = adminSection["Password"];
        var role = adminSection["Role"];
        var locationAddress = adminSection.GetSection("Location")["Address"];

        var location = context.Locations.FirstOrDefault(l => l.Address == locationAddress);
        if (location == null)
        {
            location = new Location { Address = locationAddress };
            context.Locations.Add(location);
            context.SaveChanges();
        }

        if (!context.Users.Any(u => u.Username == username))
        {
            var adminUser = new User
            {
                Name = name,
                Username = username,
                Password = password,
                Role = Enum.Parse<UserRoles>(role),
                LocationId = location.Id
            };

            context.Users.Add(adminUser);
            context.SaveChanges();
        }
    }
}

