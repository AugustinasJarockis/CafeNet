namespace CafeNet.Business_Management.DTOs
{
    public class DiscountDto
    {
        public long Id { get; set; }
        public required string Code { get; set; }
        public byte? Percent { get; set; }
        public decimal? Amount { get; set; }
    }
}
