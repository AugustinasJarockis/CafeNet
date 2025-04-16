namespace CafeNet.Data.Models
{
    public class Discount
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public short? Percent { get; set; }
        public double? Amount { get; set; }
    }
}
