using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Data.Models
{
    public class StripeReader
    {
        public long Id { get; set; }
        public string StripeSecretKey { get; set; }
        public string StripePublishKey { get; set; }

        // Optimistic concurrency token
        [NotMapped]
        public uint Version { get; set; }

    }
}
