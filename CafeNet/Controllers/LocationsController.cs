using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Services;
using CafeNet.Data.Models;
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
        [Authorize(Roles = "CLIENT,BARISTA,ADMIN")]
        [ProducesResponseType<User>(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            return Ok(_locationService.GetAll());
        }

        [HttpGet("locationsList")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<Location>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployees([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _locationService(pageNumber, pageSize);
            return Ok(result);
        }
    }
}
