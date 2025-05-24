namespace CafeNet.Business_Management.DTOs
{
    public class UpdateDiscountRequest
    {
        public required long Id { get; set; }
        public required string Code { get; set; }
        public byte? Percent { get; set; }
        public decimal? Amount { get; set; }
        public required uint Version { get; set; }
    }
}
