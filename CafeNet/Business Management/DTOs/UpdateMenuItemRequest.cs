using CafeNet.Data.Models;

namespace CafeNet.Business_Management.DTOs
{
    public class UpdateMenuItemRequest
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
        public string? ImgPath { get; set; }
        public long TaxId { get; set; }
        public uint Version { get; set; }
        public ICollection<MenuItemVariationDTO> MenuItemVariations { get; set; }
    }
}
