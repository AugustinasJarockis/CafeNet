using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Utility;
using CafeNet.Data.Models;

public class AuthService : IAuthService
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;

    public AuthService(IUserService userService, IConfiguration configuration)
    {
        _userService = userService;
        _configuration = configuration;
    }

    public async Task<User> RegisterAsync(RegisterUserRequest request)
    {
        if (await _userService.UsernameExistsAsync(request.Email))
        {
            throw new InvalidOperationException("Username already exists.");
        }

        var newUser = new User
        {
            Name = request.Name,
            Username = request.Email,
            Password = request.Password,
            Role = CafeNet.Data.Enums.UserRoles.CLIENT,
            LocationId = request.LocationId
        };

        var createdUser = await _userService.CreateAsync(newUser);
        return createdUser;
    }

    public async Task<string> LoginAsync(LoginRequest request)
    {
        var user = await _userService.GetByUsernameAsync(request.Email);

        if (user == null || user.Password != request.Password)
        {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        var token = TokenGenerator.GenerateJwtToken(user, _configuration);
        return token;
    }
}