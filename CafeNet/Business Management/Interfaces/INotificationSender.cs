using CafeNet.Data.Models;

namespace CafeNet.BusinessManagement.Interfaces
{
    public interface INotificationSender
    {
        Task SendAsync(User user, string message);
    }
}
