using CafeNet.Data.Database;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

        public async Task<Location> GetByIdAsync(long id)
        {
            return await _context.Locations.FirstOrDefaultAsync(location => location.Id == id);
        }

        public async Task<Location?> GetFirstLocationExceptAsync(long excludedLocationId)
        {
            return await _context.Locations
                .Where(l => l.Id != excludedLocationId)
                .OrderBy(l => l.Id)
                .FirstOrDefaultAsync();
        }

        public bool AddressAlreadyRegistered(string address) {
            return _context.Locations.Any(location => location.Address == address);
        }

        public async Task<IEnumerable<Location>> GetLocationsPagedAsync(int pageNumber, int pageSize)
        {
            return await _context.Locations
                                 .Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

        public async Task<int> CountLocationsAsync()
        {
            return await _context.Locations.CountAsync();
        }

        public void DeleteById(long id)
        {
            var location = _context.Locations.FirstOrDefault(u => u.Id == id);
            if (location != null)
            {
                _context.Locations.Remove(location);
                _context.SaveChanges();
            }
        }

    }
}
