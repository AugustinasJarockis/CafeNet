using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly CafeNetDbContext _context;
        public LocationRepository(CafeNetDbContext context)
        {
            _context = context;
        }
        public List<Location> GetLocations ()
        {
            return [.. _context.Locations];
        }
    }
}
