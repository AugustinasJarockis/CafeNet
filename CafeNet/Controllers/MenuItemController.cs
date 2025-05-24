using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Services;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Extensions;
using CafeNet.Infrastructure.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuItemService _menuItemService;

        public MenuItemController(IMenuItemService menuItemService) {
            _menuItemService = menuItemService;
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateMenuItem([FromBody] CreateMenuItemRequest request) {
            try {
                await _menuItemService.CreateAsync(request);
                return Created();
            }
            catch (InvalidOperationException ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<MenuItem>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMenuItems([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _menuItemService.GetMenuItemsAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(long id)
        {
            await _menuItemService.DeleteAsync(id);

            return Ok(new { message = "Menu item deleted successfully" });
        }

        [HttpPatch("availability/{id:long}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateAvailability(long id, [FromBody] UpdateItemAvailabilityRequest updateItemAvailabilityRequest)
        {
            var targetTaxId = id;
            var currentUserRole = HttpContext.GetUserRole();

            if (targetTaxId != updateItemAvailabilityRequest.Id)
                return BadRequest("ID and route does not match ID in request");

            if (currentUserRole != "ADMIN")
                return Forbid();

            var updatedAvailabilityItem = await _menuItemService.UpdateAvailabilityAsync(updateItemAvailabilityRequest);

            return Ok(updatedAvailabilityItem);
        }
    }
}
