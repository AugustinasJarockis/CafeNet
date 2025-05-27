using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Interfaces.Workflows;
using CafeNet.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace CafeNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentWorkflowService _paymentWorkflowService;
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentWorkflowService paymentWorkflowService, IPaymentService paymentService)
    {
        _paymentWorkflowService = paymentWorkflowService;
        _paymentService = paymentService;
    }

    [HttpPost]
    [Authorize(Roles = "CLIENT")]
    public async Task<ActionResult<CreatePaymentResult>> CreatePayment([FromBody] CreatePaymentRequest request)
    {
        request.UserId = HttpContext.GetUserId();
        var result = await _paymentWorkflowService.CreatePaymentWithOrderAsync(request);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Created(string.Empty, result);
    }

    [HttpPost("payments/process")]
    [Authorize(Roles = "CLIENT")]
    public async Task<IActionResult> GetPaymentIntent([FromBody] CreatePaymentRequest request)
    {
        var (clientSecret, paymentIntentId) = await _paymentService.ProcessStripePaymentAsync(request);
        return Ok(new { clientSecret, paymentIntentId });
    }

}
