using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [NotMapped]
        public uint Version { get; set; }
    }
}
