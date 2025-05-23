using CafeNet.Business_Management.Interfaces;

namespace CafeNet.Business_Management.DTOs;

public class PatchOwnProfileRequest : IValidateableUserRequest
{
    public string? Name { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public long? LocationId { get; set; }
    public required string Version { get; set; }
}
