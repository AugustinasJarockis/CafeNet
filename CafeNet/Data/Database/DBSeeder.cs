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
            var username = adminSection.GetRequiredConfigValue("Username");

            if (!context.Users.Any(user => user.Username == username))
            {
                var request = new RegisterUserRequest
                {
                    Name = adminSection.GetRequiredConfigValue("Name"),
                    Username = username,
                    Password = adminSection.GetRequiredConfigValue("Password"),
                    Role = Enum.Parse<UserRoles>(adminSection.GetRequiredConfigValue("Role")),
                    LocationId = null
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

    public static void SeedCustomers(CafeNetDbContext context, IConfiguration config)
    {
        var customers = config.GetSection("SeedData:Customers").GetChildren();

        foreach (var customerSection in customers)
        {
            var username = customerSection.GetRequiredConfigValue("Username");

            if (!context.Users.Any(user => user.Username == username))
            {
                var request = new RegisterUserRequest
                {
                    Name = customerSection.GetRequiredConfigValue("Name"),
                    Username = username,
                    Password = customerSection.GetRequiredConfigValue("Password"),
                    Role = Enum.Parse<UserRoles>(customerSection.GetRequiredConfigValue("Role")),
                    PhoneNumber = customerSection.GetRequiredConfigValue("PhoneNumber"),
                    LocationId = context.Locations.First().Id
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
    public static void SeedTaxes(CafeNetDbContext context, IConfiguration config)
    {
        var taxesSection = config.GetSection("SeedData:Taxes");
        var taxesItems = taxesSection.GetChildren();

        foreach (var taxesItem in taxesItems)
        {
            if (!context.Taxes.Any(t => t.Type == taxesItem.GetRequiredConfigValue("Type")))
            {
                var request = new CreateTaxRequest
                {
                    Type = taxesItem.GetRequiredConfigValue("Type"),
                    Percent = byte.Parse(taxesItem.GetRequiredConfigValue("Percent"))
                };

                var tax = TaxMapper.ToTax(request);

                context.Taxes.Add(tax);
            }
        }

        context.SaveChanges();
    }

    public static void SeedMenuItems(CafeNetDbContext context, IConfiguration config)
    {
        var menuItems = config.GetSection("SeedData:MenuItems").GetChildren();

        foreach (var menuItem in menuItems)
        {
            var title = menuItem.GetRequiredConfigValue("Title");

            if (!context.MenuItems.Any(m => m.Title == title))
            {
                var taxType = menuItem.GetRequiredConfigValue("TaxType");
                var tax = context.Taxes.FirstOrDefault(t => t.Type == taxType);
                if (tax == null)
                    continue;

                var newItem = new MenuItem
                {
                    Title = title,
                    Price = decimal.Parse(menuItem.GetRequiredConfigValue("Price")),
                    Available = bool.Parse(menuItem.GetRequiredConfigValue("Available")),
                    ImgPath = menuItem["ImgPath"],
                    TaxId = tax.Id
                };

                context.MenuItems.Add(newItem);
            }
        }

        context.SaveChanges();
    }

    public static void SeedMenuItemVariations(CafeNetDbContext context, IConfiguration config)
    {
        var variations = config.GetSection("SeedData:MenuItemVariations").GetChildren();

        foreach (var variation in variations)
        {
            var title = variation.GetRequiredConfigValue("Title");
            var menuItemTitle = variation.GetRequiredConfigValue("MenuItemTitle");

            var menuItem = context.MenuItems.FirstOrDefault(m => m.Title == menuItemTitle);
            if (menuItem == null)
                continue;

            if (!context.MenuItemVariations.Any(v => v.Title == title && v.MenuItemId == menuItem.Id))
            {
                var newVariation = new MenuItemVariation
                {
                    Title = title,
                    PriceChange = decimal.Parse(variation.GetRequiredConfigValue("PriceChange")),
                    MenuItemId = menuItem.Id
                };

                context.MenuItemVariations.Add(newVariation);
            }
        }

        context.SaveChanges();
    }


    public static void SeedDiscounts(CafeNetDbContext context, IConfiguration config)
    {
        var discountSection = config.GetSection("SeedData:Discounts").GetChildren();

        foreach (var discount in discountSection)
        {
            var code = discount.GetRequiredConfigValue("Code");

            if (!context.Discounts.Any(d => d.Code == code))
            {
                var newDiscount = new Discount
                {
                    Code = code,
                    Percent = string.IsNullOrWhiteSpace(discount["Percent"]) ? null : byte.Parse(discount["Percent"]),
                    Amount = string.IsNullOrWhiteSpace(discount["Amount"]) ? null : decimal.Parse(discount["Amount"])
                };

                context.Discounts.Add(newDiscount);
            }
        }

        context.SaveChanges();
    }
}
