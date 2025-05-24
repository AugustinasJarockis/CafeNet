namespace CafeNet.Business_Management.DTOs
{
    public class UpdateLocationRequest
    {
        public long Id { get; set; }
        public string Address { get; set; }
        public uint Version { get; set; }
    }
}
