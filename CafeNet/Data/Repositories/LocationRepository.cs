using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly CafeNetDbContext _context;

        public LocationRepository(CafeNetDbContext context) {
            _context = context;
        }
        public List<Location> GetLocations() {
            return [.. _context.Locations];
        }
        public async Task<Location> CreateAsync(Location location) {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();
            return location;
        }

        public bool AddressAlreadyRegistered(string address) {
            return _context.Locations.Any(location => location.Address == address);
        }
    }
}
