namespace CafeNet.Business_Management.Interfaces;

public interface IValidateableUserRequest
{
    string? Name { get; }
    string? Username { get; }
}
