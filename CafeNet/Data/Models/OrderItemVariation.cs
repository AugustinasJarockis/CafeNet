using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [NotMapped]
        public uint Version { get; set; }

    }
}
