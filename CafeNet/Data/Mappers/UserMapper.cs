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
    }
}
