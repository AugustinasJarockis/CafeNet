using CafeNet.Data.Models;

namespace CafeNet.Business_Management.DTOs
{
    public class UpdateItemAvailabilityRequest
    {
        public long Id { get; set; }
        public bool Available { get; set; }
        public uint Version { get; set; }
    }
}
