using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ILocationRepository
    {
        public List<Location> GetLocations();
        public Task<Location> CreateAsync(Location location);
        public Task<Location> GetByIdAsync(long id);
        public bool AddressAlreadyRegistered(string address);
    }
}
