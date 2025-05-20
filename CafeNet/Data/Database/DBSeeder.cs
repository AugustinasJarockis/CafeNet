using CafeNet.Data.Database;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;

public static class DbSeeder
{
    public static void SeedAdminUsers(CafeNetDbContext context, IConfiguration config)
    {
        var adminUsers = config.GetSection("SeedData:AdminUsers").GetChildren();

        foreach (var adminSection in adminUsers)
        {
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
                    Password = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13),
                    Role = Enum.Parse<UserRoles>(role),
                    LocationId = location.Id
                };

                context.Users.Add(adminUser);
                context.SaveChanges();
            }
        }
    }

    public static void SeedBaristaUsers(CafeNetDbContext context, IConfiguration config)
    {
        var baristaUsers = config.GetSection("SeedData:BaristaUsers").GetChildren();

        foreach (var baristaSection in baristaUsers)
        {
            var name = baristaSection["Name"];
            var username = baristaSection["Username"];
            var password = baristaSection["Password"];
            var role = baristaSection["Role"];
            var locationAddress = baristaSection.GetSection("Location")["Address"];

            var location = context.Locations.FirstOrDefault(l => l.Address == locationAddress);
            if (location == null)
            {
                location = new Location { Address = locationAddress };
                context.Locations.Add(location);
                context.SaveChanges();
            }

            if (!context.Users.Any(u => u.Username == username))
            {
                var baristaUser = new User
                {
                    Name = name,
                    Username = username,
                    Password = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13),
                    Role = Enum.Parse<UserRoles>(role),
                    LocationId = location.Id
                };

                context.Users.Add(baristaUser);
                context.SaveChanges();
            }
        }
    }

    public static void SeedLocations(CafeNetDbContext context, IConfiguration config)
    {
        var locationsSection = config.GetSection("SeedData:Locations");
        var locationItems = locationsSection.GetChildren();

        foreach (var locationItem in locationItems)
        {
            var address = locationItem["Address"];

            if (!string.IsNullOrWhiteSpace(address) &&
                !context.Locations.Any(l => l.Address == address))
            {
                context.Locations.Add(new Location { Address = address });
            }
        }

        context.SaveChanges();
    }
}
