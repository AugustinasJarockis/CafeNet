using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Enums;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Extensions;

namespace CafeNet.Data.Database;
public static class DbSeeder
{
    public static void SeedAdminUsers(CafeNetDbContext context, IConfiguration config)
    {
        var adminUsers = config.GetSection("SeedData:AdminUsers").GetChildren();

        foreach (var adminSection in adminUsers)
        {
            var locationAddress = adminSection.GetSection("Location")
                                              .GetRequiredConfigValue("Address");

            var location = context.Locations.FirstOrDefault(l => l.Address == locationAddress);
            if (location == null)
            {
                location = new Location { Address = locationAddress };
                context.Locations.Add(location);
                context.SaveChanges();
            }

            var username = adminSection.GetRequiredConfigValue("Username");
            if (!context.Users.Any(user => user.Username == username))
            {
                var request = new RegisterUserRequest
                {
                    Name = adminSection.GetRequiredConfigValue("Name"),
                    Username = username,
                    Password = adminSection.GetRequiredConfigValue("Password"),
                    Role = Enum.Parse<UserRoles>(adminSection.GetRequiredConfigValue("Role")),
                    LocationId = location.Id
                };

                var user = UserMapper.ToUser(request);
                context.Users.Add(user);
                context.SaveChanges();
            }
        }
    }

    public static void SeedBaristaUsers(CafeNetDbContext context, IConfiguration config)
    {
        var baristaUsers = config.GetSection("SeedData:BaristaUsers").GetChildren();

        foreach (var baristaSection in baristaUsers)
        {
            var locationAddress = baristaSection.GetSection("Location").GetRequiredConfigValue("Address");

            var location = context.Locations.FirstOrDefault(l => l.Address == locationAddress);
            if (location == null)
            {
                location = new Location { Address = locationAddress };
                context.Locations.Add(location);
                context.SaveChanges();
            }

            var username = baristaSection.GetRequiredConfigValue("Username");

            if (!context.Users.Any(user => user.Username == username))
            {
                var request = new RegisterUserRequest
                {
                    Name = baristaSection.GetRequiredConfigValue("Name"),
                    Username = username,
                    Password = baristaSection.GetRequiredConfigValue("Password"),
                    Role = Enum.Parse<UserRoles>(baristaSection.GetRequiredConfigValue("Role")),
                    LocationId = location.Id
                };

                var user = UserMapper.ToUser(request);
                context.Users.Add(user);
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
