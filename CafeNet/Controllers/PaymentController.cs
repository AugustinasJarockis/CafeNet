using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interfaces.Workflows;
using CafeNet.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentWorkflowService _paymentWorkflowService;

    public PaymentController(IPaymentWorkflowService paymentWorkflowService)
    {
        _paymentWorkflowService = paymentWorkflowService;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CreatePaymentResult>> CreatePayment([FromBody] CreatePaymentRequest request)
    {
        request.UserId = HttpContext.GetUserId();
        var result = await _paymentWorkflowService.CreatePaymentWithOrderAsync(request);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Created(string.Empty, result);
    }
}
