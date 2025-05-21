using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;
public class RegisterUserRequest
{
    public required string Name { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public long? LocationId { get; set; }
    public UserRoles? Role { get; set; }
}