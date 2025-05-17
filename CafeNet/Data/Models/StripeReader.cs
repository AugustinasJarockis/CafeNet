using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class StripeReader
    {
        public long Id { get; set; }
        public string StripeSecretKey { get; set; }
        public string StripePublishKey { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
