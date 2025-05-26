using CafeNet.BusinessManagement.Interfaces;
using CafeNet.Data.Models;

namespace CafeNet.BusinessManagement.Services
{
    public class MessageTextDecorator : INotificationSender
    {
        private readonly INotificationSender _inner;
        public MessageTextDecorator(INotificationSender inner)
        {
            _inner = inner;
        }

        public async Task SendAsync(User user, string message)
        {
            var location = user.Location?.Address ?? "our cafe";
            var newMessage = $"{message}. Please take your order at {location}.";
            await _inner.SendAsync(user, newMessage);
        }
    }
}
