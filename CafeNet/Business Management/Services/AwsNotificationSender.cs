using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.BusinessManagement.Interfaces;
using CafeNet.Data.Models;

namespace CafeNet.BusinessManagement.Services
{
    public class AwsNotificationSender : INotificationSender
    {
        private readonly IAmazonSimpleNotificationService _snsClient;

        public AwsNotificationSender(IAmazonSimpleNotificationService snsClient)
        {
            _snsClient = snsClient;
        }

        [Loggable]
        public async Task SendAsync(User user, string message)
        {
            try
            {
                var request = new PublishRequest
                {
                    Message = message,
                    PhoneNumber = user.PhoneNumber ?? string.Empty
                };

                await _snsClient.PublishAsync(request);
            }
            catch (AmazonSimpleNotificationServiceException ex)
            {
                throw new ServiceUnavailableException(ex.Message);
            }
        }
    }
}
