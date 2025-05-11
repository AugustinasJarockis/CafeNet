using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;
public class RegisterUserRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public long? LocationId { get; set; }
}