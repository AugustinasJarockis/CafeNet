using System.ComponentModel.DataAnnotations;

namespace CafeNet.Data.Models
{
    public class Credit
    {
        public long Id { get; set; }
        public decimal Balance { get; set; }
        public long UserId { get; set; }

        // for foreign keys
        public User User { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        public byte[] Version { get; set; }
    }
}
