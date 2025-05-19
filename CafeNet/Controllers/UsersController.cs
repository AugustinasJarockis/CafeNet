using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public UsersController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
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

        [HttpGet("employees")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<User>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployees([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _userService.GetEmployeesAsync(pageNumber, pageSize);
            return Ok(result);
        }
    }
}
