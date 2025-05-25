using Microsoft.AspNetCore.Mvc;
using CafeNet.Business_Management.DTOs;
using CafeNet.Infrastructure.Notifications_Management;
using Microsoft.AspNetCore.Authorization;
using CafeNet.Infrastructure.Extensions;
using CafeNet.Business_Management.Interfaces;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly SMSService _smsService;
        private readonly IUserService _userService;

        public NotificationsController(
            SMSService smsService,
            IUserService userService )
        {
            _smsService = smsService;
            _userService = userService;
        }

        [HttpPost("sms")]
        [Authorize(Roles = "CLIENT")]
        [ProducesResponseType(typeof(SendSmsResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendSms([FromBody] SendSmsRequest request)
        {
            var user = await _userService.GetByIdAsync(HttpContext.GetUserId());

            try
            {
                var messageId = await _smsService.SendSMSAsync(user.PhoneNumber ?? "", request.Message);

                return Ok(new SendSmsResponse
                {
                    IsSuccess = true,
                    MessageId = messageId,
                    Message = "SMS sent successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new SendSmsResponse
                {
                    IsSuccess = false,
                    Message = "Failed to send SMS: " + ex.Message
                });
            }
        }
    }
}
