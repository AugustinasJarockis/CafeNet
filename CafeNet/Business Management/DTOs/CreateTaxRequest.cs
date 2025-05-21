namespace CafeNet.Business_Management.DTOs
{
    public class CreateTaxRequest
    {
        public required string Type { get; set; }
        public byte Percent { get; set; }
    }
}
