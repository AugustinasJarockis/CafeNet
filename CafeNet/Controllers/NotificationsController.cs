using Microsoft.AspNetCore.Mvc;
using CafeNet.Business_Management.DTOs;
using Microsoft.AspNetCore.Authorization;
using CafeNet.Infrastructure.Extensions;
using CafeNet.Business_Management.Interfaces;
using CafeNet.BusinessManagement.Interfaces;
using CafeNet.Data.Models;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationSender _notificationSender;
        private readonly IUserService _userService;

        public NotificationsController(
            INotificationSender notificationSender,
            IUserService userService )
        {
            _notificationSender = notificationSender;
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

            await _notificationSender.SendAsync(user, request.Message);

            return Ok();
        }
    }
}
