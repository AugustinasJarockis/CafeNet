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
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationsController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> CreateLocation([FromBody] CreateLocationRequest request) {
            try {
                await _locationService.CreateAsync(request);
                return Created();
            }
            catch (InvalidOperationException ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<Location>), StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            return Ok(_locationService.GetAll());
        }
        
        [HttpGet("locationsList")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<Location>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLocations([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _locationService.GetLocationsAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(long id)
        {
            await _locationService.DeleteAsync(id);

            return Ok(new { message = "Location deleted successfully" });
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(long id, [FromBody] UpdateLocationRequest updateLocationRequest)
        {
            var targetLocationId = id;
            var currentUserRole = HttpContext.GetUserRole();

            if (targetLocationId != updateLocationRequest.Id)
                return BadRequest("ID and route does not match ID in request");

            if (currentUserRole != "ADMIN")
                return Forbid();

            var updatedLocation = await _locationService.UpdateLocationAsync(updateLocationRequest);
            return Ok(updatedLocation);
        }
    }
}
