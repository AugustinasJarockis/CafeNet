using CafeNet.Data.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Data.Models
{
    public class Payment
    {
        public long Id { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal UsedCredits { get; set; }
        public decimal RefundedAmount { get; set; }
        public PaymentMethod Method { get; set; }
        public PaymentStatus Status { get; set; }
        public long OrderId { get; set; }
        public long UserId { get; set; }

        // for foreign keys
        public User User { get; set; }

        [ForeignKey("OrderId")]
        [InverseProperty("Payment")]
        public Order Order { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
