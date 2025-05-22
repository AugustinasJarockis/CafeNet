using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;

public class PatchUserRequest : IValidateableUserRequest
{
    public string? Name { get; set; }
    public string? Username { get; set; }
    public long? LocationId { get; set; }
    public required string Version { get; set; }
}
