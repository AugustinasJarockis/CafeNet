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

        public static UserDto ToUserDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Password = user.Password,
                Role = user.Role.ToString(),
                LocationId = user.LocationId,
                LocationAddress = user.Location?.Address ?? "Unassigned"
            };
        }
    }
}
