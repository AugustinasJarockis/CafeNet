namespace CafeNet.Business_Management.DTOs
{
    public class SendSmsResponse
    {
        public bool IsSuccess { get; set; }
        public string? MessageId { get; set; }
        public string? Message { get; set; }
    }
}