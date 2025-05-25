using Amazon.SimpleNotificationService.Model;
using Amazon.SimpleNotificationService;
using CafeNet.Business_Management.Interceptors;

namespace CafeNet.Infrastructure.Notifications_Management
{
    public class SMSService
    {
        private readonly IAmazonSimpleNotificationService _snsClient;


        public SMSService(IAmazonSimpleNotificationService snsClient)
        {
            _snsClient = snsClient;
        }
        [Loggable]
        public async Task<string> SendSMSAsync(string phoneNumber, string message)
        {
            try
            {
                var request = new PublishRequest
                {
                    Message = message,
                    PhoneNumber = phoneNumber
                };

                var response = await _snsClient.PublishAsync(request);
                return response.MessageId;
            }
            catch (AmazonSimpleNotificationServiceException ex)
            {
                throw new Exception($"Error sending SMS: {ex.Message}", ex);
            }
        }
    }
}
