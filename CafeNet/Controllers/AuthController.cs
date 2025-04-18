using CafeNet.Business_Management.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(ILogger<AuthController> logger) : Controller
    {
        //private readonly IAuthService _authService = authService;
        private readonly ILogger<AuthController> _logger = logger;

        [HttpPost("login")]
        //[ProducesResponseType<LoginResponseDTO>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromBody] LoginRequest loginRequest) {
            //var login = _authService.Login(loginRequest);

            //if (!login.IsSuccess)
            //    return Unauthorized(login);

            //Response.Headers.Append("Authorization", "Bearer " + login.Token);
            //return Ok(login);
            return Ok(new { IsSuccess = true, Token = "kjdfb", Message = "All good"});
        }
    }
}
