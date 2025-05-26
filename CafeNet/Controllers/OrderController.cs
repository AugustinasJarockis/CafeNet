using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Interfaces.Workflows;
using CafeNet.Business_Management.Services;
using CafeNet.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "BARISTA")]
        public async Task<ActionResult<OrderDTO>> GetOrders(long id, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _orderService.GetOrdersByLocationAsync(id, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpPatch("status/{id:long}")]
        [Authorize(Roles = "BARISTA")]
        public async Task<IActionResult> UpdateAvailability(long id, [FromBody] UpdateOrderStatusRequest updateOrderStatusRequest)
        {
            var targetOrderId = id;
            var currentUserRole = HttpContext.GetUserRole();

            if (targetOrderId != updateOrderStatusRequest.Id)
                return BadRequest("ID and route does not match ID in request");

            if (currentUserRole != "BARISTA")
                return Forbid();

            var updateOrderStatus = await _orderService.UpdateOrderStatusAsync(updateOrderStatusRequest);

            return Ok(updateOrderStatus);
        }

        [HttpPatch("paymentPaid/{id:long}")]
        [Authorize(Roles = "BARISTA")]
        public async Task<IActionResult> UpdatePaymentPaidStatus(long id)
        {
            var currentUserRole = HttpContext.GetUserRole();

            if (currentUserRole != "BARISTA")
                return Forbid();

            // Call your service layer to mark the payment as paid
            var success = await _orderService.MarkPaymentAsPaidAsync(id);

            if (!success)
                return NotFound(); 

            return NoContent(); 
        }
    }
}
