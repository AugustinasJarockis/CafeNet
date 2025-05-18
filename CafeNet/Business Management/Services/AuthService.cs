using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Utility;
using CafeNet.Business_Management.Validators;
using CafeNet.Data.Mappings;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Services;
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
        var newUser = UserMapper.ToUser(request);

        var createdUser = await _userService.CreateAsync(newUser);
        return createdUser;
    }

    public async Task<string> LoginAsync(LoginRequest request)
    {
        var user = await _userService.GetByUsernameAsync(request.Username);

        AuthValidator.ValidateLoginRequest(request);

        var passwordVerify = BCrypt.Net.BCrypt.EnhancedVerify(request.Password, user.Password);

        if (!passwordVerify)
        {
            throw new BadRequestException("Password is incorrect");
        }

        var token = TokenGenerator.GenerateJwtToken(user, _configuration);
        return token;
    }
}