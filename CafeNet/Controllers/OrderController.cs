using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Interfaces.Workflows;
using CafeNet.Business_Management.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
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
    }
}
