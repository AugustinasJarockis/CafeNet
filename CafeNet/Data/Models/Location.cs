using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class Location
    {
        public long Id { get; set; }
        public string Address { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
