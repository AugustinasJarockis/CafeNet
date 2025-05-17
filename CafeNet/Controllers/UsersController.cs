using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Services;
using CafeNet.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IAuthService _authService;

        public UsersController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType<User>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] RegisterUserRequest request)
        {
            var user = await _authService.RegisterAsync(request);
            return Ok(new { message = "User created successfully", user.Id });
        }
    }
}
