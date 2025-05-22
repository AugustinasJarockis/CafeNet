using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Services;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private readonly IDiscountService _discountService;

        public DiscountsController(IDiscountService discountService) {
            _discountService = discountService;
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> CreateDiscount([FromBody] CreateDiscountRequest request) {
            try {
                await _discountService.CreateAsync(request);
                return Created();
            }
            catch (InvalidOperationException ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<Discount>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDiscounts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _discountService.GetDiscountsAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(long id)
        {
            await _discountService.DeleteAsync(id);

            return Ok(new { message = "Location deleted successfully" });
        }
    }
}
