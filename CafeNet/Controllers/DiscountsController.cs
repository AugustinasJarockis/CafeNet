using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> CreateDiscount([FromBody] CreateDiscountRequest request) {
            await _discountService.CreateAsync(request);
            return Created();
        }

        [HttpPut]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(Discount), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> UpdateDiscount([FromBody] UpdateDiscountRequest request) {
            var discount = await _discountService.UpdateAsync(request);
            Console.WriteLine(request.Version);
            return Ok(discount);
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(PagedResult<DiscountDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDiscounts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _discountService.GetDiscountsAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(typeof(DiscountDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDiscount(long id) {
            var result = await _discountService.GetDiscountAsync(id);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            await _discountService.DeleteAsync(id);

            return Ok(new { message = "Location deleted successfully" });
        }
    }
}
