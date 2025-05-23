using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Data.Models
{
    public class MenuItemVariation
    {
        public long Id { get; set; }
        public long MenuItemId { get; set; }
        public string Title { get; set; }
        public decimal PriceChange { get; set; }

        public ICollection<OrderItemVariation> OrderItemVariations { get; set; }

        // for foreign keys
        public MenuItem MenuItem { get; set; }

        // Optimistic concurrency token
        [NotMapped]
        public uint Version { get; set; }

    }
}
