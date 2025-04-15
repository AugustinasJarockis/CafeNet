using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

        }
    }
}
