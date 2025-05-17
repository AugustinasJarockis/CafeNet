using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;
public class RegisterUserRequest
{
    public string Name { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public long? LocationId { get; set; }
    public UserRoles? Role { get; set; }
}