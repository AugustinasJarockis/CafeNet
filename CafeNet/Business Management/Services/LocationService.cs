using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Services
{
    public class LocationService: ILocationService
    {
        private readonly CafeNetDbContext _context;

        public LocationService(CafeNetDbContext context) {
            _context = context;
        }
        public async Task<Location> CreateAsync(CreateLocationRequest request) {
            var location = request.ToLocation();
            if (_context.Locations.Select(location => location.Address).Contains(location.Address))
                throw new ConflictException("A location with this address already exists"); 
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();
            return location;
        }
    }
}
