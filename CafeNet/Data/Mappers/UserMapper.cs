using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class UserMapper
    {
        public static User ToUser(RegisterUserRequest request)
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

        public static User PatchUser(User user, PatchUserRequest request)
        {
            if (request.Name is not null)
                user.Name = request.Name;

            if (request.Username is not null)
                user.Username = request.Username;

            if (request.LocationId is not null)
                user.LocationId = request.LocationId;

            user.Version = uint.Parse(request.Version);

            return user;
        }

        public static User PatchUser(User user, PatchOwnProfileRequest request)
        {
            if (request.Name is not null)
                user.Name = request.Name;

            if (request.Username is not null)
                user.Username = request.Username;

            if (request.Password is not null)
                user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Password, 13);

            if (request.LocationId is not null)
                user.LocationId = request.LocationId;

            user.Version = uint.Parse(request.Version);

            return user;
        }

        public static UserDto ToUserDto(User user) => new()
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
