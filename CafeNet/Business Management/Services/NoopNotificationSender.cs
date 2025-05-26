using CafeNet.BusinessManagement.Interfaces;
using CafeNet.Data.Models;

namespace CafeNet.BusinessManagement.Services
{
    public class NoopNotificationSender : INotificationSender
    {
        public Task SendAsync(User user, string message)
        {
            return Task.CompletedTask;
        }
    }
}
