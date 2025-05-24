using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Data.Models
{
    public class Discount
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public byte? Percent { get; set; }
        public decimal? Amount { get; set; }

        // Optimistic concurrency token
        [NotMapped]
        public uint Version { get; set; }

    }
}
