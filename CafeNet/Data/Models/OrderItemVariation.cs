using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class OrderItemVariation
    {
        public long Id { get; set; }
        public long MenuItemVariationId { get; set; }
        public long OrderItemId { get; set; }

        // for foreign keys
        public MenuItemVariation MenuItemVariation { get; set; }
        public OrderItem OrderItem { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
