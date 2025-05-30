﻿using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Extensions;
using CafeNet.Infrastructure.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CafeNet.Data.Mappers;

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
        [Authorize]
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

        [HttpGet("menuItemsByTax")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(IEnumerable<Tax>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMenuItemsByTax([FromQuery(Name = "taxId")] long taxId)
        {
            var result = await _menuItemService.GetMenuItemsByTaxIdAsync(taxId);
            return Ok(result);
        }

        [HttpPut("{id:long}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(long id, [FromBody] UpdateMenuItemRequest updateMenuItemRequest)
        {
            var targetMenuItemId = id;
            var currentUserRole = HttpContext.GetUserRole();

            if (targetMenuItemId != updateMenuItemRequest.Id)
                return BadRequest("ID and route does not match ID in request");

            if (currentUserRole != "ADMIN")
                return Forbid();

            var updatedMenuItem = await _menuItemService.UpdateAsync(updateMenuItemRequest);
            var updatedMenuItemDTO = updatedMenuItem.ToMenuItemDTO(); 

            return Ok(updatedMenuItemDTO);
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(typeof(MenuItemDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetMenuItem(long id)
        {
            var result = await _menuItemService.GetMenuItemAsync(id);
            return Ok(result);
        }
    }
}
