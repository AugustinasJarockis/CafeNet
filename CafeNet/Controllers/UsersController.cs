using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Utility;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Extensions;
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

        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] PatchOwnProfileRequest request)
        {
            var userId = HttpContext.GetUserId();

            var updatedUser = await _userService.PatchOwnProfileAsync(userId, request);
            return Ok(updatedUser);
        }

        [HttpPatch("{id:long}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(long id, [FromBody] PatchUserRequest request)
        {
            var targetUserId = id;
            var currentUserId = HttpContext.GetUserId();

            var updatedUser = await _userService.AdminPatchUserAsync(targetUserId, currentUserId, request);
            return Ok(updatedUser);
        }

        [HttpGet("employees")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<User>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployees([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _userService.GetEmployeesAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetOwnProfile()
        {
            var currentUserId = HttpContext.GetUserId();

            var result = await _userService.GetByIdAsync(currentUserId);
            return Ok(result);
        }

        [HttpGet("employeesByLocation")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(IEnumerable<User>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployeesByLocation([FromQuery(Name = "locationId")] long locationId)
        {
            var result = await _userService.GetEmployeesByLocation(locationId);
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
    }
}
