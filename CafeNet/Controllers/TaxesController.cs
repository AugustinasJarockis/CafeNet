using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxesController : ControllerBase
    {
        private readonly ITaxService _taxService;
        public TaxesController(ITaxService taxService)
        {
            _taxService = taxService;
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateTax([FromBody] CreateTaxRequest request)
        {
            try
            {
                await _taxService.CreateAsync(request);
                return Created();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType<List<Tax>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public IActionResult GetAll()
        {
            return Ok(_taxService.GetAll());
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Delete(long id)
        {

            await _taxService.DeleteAsync(id);

            return Ok(new { message = "Tax deleted successfully" });
        }
    }
}
