using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class UserMapper
    {
        public static User ToUser(this RegisterUserRequest request)
        {
            return new User
            {
                Name = request.Name,
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, 13),
                Role = request.Role ?? UserRoles.CLIENT,
                LocationId = request.LocationId
            };
        }

        public static User ToUser(this User user, PatchUserRequest request)
        {
            user.Name = request.Name ?? user.Name;
            user.Username = request.Username ?? user.Username;
            user.LocationId = request.LocationId ?? user.LocationId;
            user.Version = uint.Parse(request.Version);
            return user;
        }

        public static User ToUser(this User user, PatchOwnProfileRequest request)
        {
            user.Name = request.Name ?? user.Name;
            user.Username = request.Username ?? user.Username;
            user.LocationId = request.LocationId ?? user.LocationId;

            if (request.Password is not null)
                user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, 13);

            user.Version = uint.Parse(request.Version);
            return user;
        }

        public static UserDto ToUserDto(this User user) => new()
        {
            Id = user.Id,
            Name = user.Name,
            Username = user.Username,
            Password = user.Password,
            Role = user.Role.ToString(),
            LocationId = user.LocationId,
            LocationAddress = user.Location?.Address ?? "Unassigned",
            Version = user.Version.ToString(),
        };
    }
}
