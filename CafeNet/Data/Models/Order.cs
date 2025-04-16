using CafeNet.Data.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Data.Models
{
    public class Order
    {
        public long Id { get; set; }
        public OrderStatus Status { get; set; }
        public long? DiscountId { get; set; }
        public long LocationId { get; set; }
        public long UserId { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }

        // for foreign keys
        [InverseProperty("Order")]
        public Payment Payment { get; set; }
        public Discount Discount { get; set; }
        public Location Location { get; set; }
        public User User { get; set; }
    }
}
