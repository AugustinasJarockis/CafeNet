using CafeNet.Data.Models;

namespace CafeNet.Business_Management.DTOs
{
    public class MenuItemDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
        public string? ImgPath { get; set; }
        public long TaxId { get; set; }
        public required string Version { get; set; }
        public ICollection<MenuItemVariationDto> MenuItemVariations { get; set; }
        public Tax Tax { get; set; }
    }
}
