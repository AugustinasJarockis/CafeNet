using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class Receipt
    {
        [Key]
        public long Id { get; set; }
        public decimal TotalPrice { get; set; }
        public string? StripePaymentId { get; set; }
        public string? StripePaymentIntentId { get; set; }
        public long PaymentId { get; set; }
        public long OrderId { get; set; }
        public long LocationId { get; set; }

        public Payment Payment { get; set; }
        public Order Order { get; set; }
        public Location Location { get; set; }
    }
}
