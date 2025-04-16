namespace CafeNet.Data.Models
{
    public class Tax
    {
        public long Id { get; set; }
        public string Type { get; set; }
        public byte Percent { get; set; }
        public bool IsArchived { get; set; }
    }
}
