using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class Tax
    {
        public long Id { get; set; }
        public string Type { get; set; }
        public byte Percent { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
