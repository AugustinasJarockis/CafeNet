using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
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

        [HttpGet("menuItemsByTax")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(IEnumerable<Tax>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMenuItemsByTax([FromQuery(Name = "taxId")] long taxId)
        {
            var result = await _menuItemService.GetMenuItemsByTaxIdAsync(taxId);
            return Ok(result);
        }
    }
}
