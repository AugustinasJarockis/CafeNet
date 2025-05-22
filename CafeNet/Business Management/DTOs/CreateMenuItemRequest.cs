using CafeNet.Data.Models;

namespace CafeNet.Business_Management.DTOs
{
    public class CreateMenuItemRequest
    {
        public required string Title { get; set; }
        public decimal Price { get; set; }
        public string? ImgPath { get; set; }
        public long TaxId { get; set; }

        public List<CreateMenuItemVariationDTO>? MenuItemVariations { get; set; }
    }
}
