using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class MenuItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
        public string? ImgPath { get; set; }
        public long TaxId { get; set; }

        public ICollection<MenuItemVariation> MenuItemVariations { get; set; }

        // for foreign keys
        public Tax Tax { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
