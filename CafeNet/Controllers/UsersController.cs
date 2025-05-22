using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Utility;
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

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<User>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            if (TokenHandler.GetUserId(HttpContext.Request.Headers.Authorization) == id)
                return Forbid();

            await _userService.DeleteAsync(id);

            return Ok(new { message = "User deleted successfully" });
        }

        [HttpGet("User/location")]
        [Authorize(Roles = "BARISTA")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCurrentUserLocation()
        {
            var userId = TokenHandler.GetUserId(Request.Headers.Authorization);

            try
            {
                var locationAddress = await _userService.GetUserLocationAddressAsync(userId);
                return Ok(locationAddress);
            }
            catch (NotFoundException)
            {
                return NotFound("Location not found for the current user");
            }
        }

    }
}
