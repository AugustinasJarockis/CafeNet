namespace CafeNet.Business_Management.DTOs
{
    public class DiscountDTO
    {
        public long Id { get; set; }
        public required string Code { get; set; }
        public byte? Percent { get; set; }
        public decimal? Amount { get; set; }
        public uint Version { get; set; }
    }
}
