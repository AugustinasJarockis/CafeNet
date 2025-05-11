using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Interfaces;

public interface IAuthService
{
    Task<User> RegisterAsync(RegisterUserRequest request);
    Task<string> LoginAsync(LoginRequest request);
}
