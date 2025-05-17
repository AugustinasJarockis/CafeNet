using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class OrderItem
    {
        public long Id { get; set; }
        public bool Refunded { get; set; }
        public long OrderId { get; set; }
        public long MenuItemId { get; set; }
        public ICollection<OrderItemVariation> OrderItemVariations { get; set; }

        // for foreign keys
        public Order Order { get; set; }
        public MenuItem MenuItem { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
