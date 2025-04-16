using CafeNet.Data.Enums;

namespace CafeNet.Data.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public UserRoles Role { get; set; }
        public long? LocationId { get; set; }

        public ICollection<Order> Orders { get; set; }

        // for foreign keys
        public Location Location { get; set; }
        public Credit Credit { get; set; }
    }
}
