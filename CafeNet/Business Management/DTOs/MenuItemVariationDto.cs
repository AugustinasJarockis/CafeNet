namespace CafeNet.Business_Management.DTOs
{
    public class MenuItemVariationDTO
    {
        public long Id { get; set; }
        public long MenuItemId { get; set; }
        public string Title { get; set; }
        public decimal PriceChange { get; set; }
    }
}