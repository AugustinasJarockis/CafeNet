using System.ComponentModel.DataAnnotations;

namespace CafeNet.Business_Management.DTOs
{
    public class SendSmsRequest
    {
        [Required(ErrorMessage = "Message is required")]
        [StringLength(160, MinimumLength = 1, ErrorMessage = "Message must be between 1 and 160 characters")]
        public required string Message { get; set; }
    }
}
