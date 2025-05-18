using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ILocationRepository
    {
        public List<Location> GetLocations();
        public Task<Location> CreateAsync(Location location); 
        public bool AddressAlreadyRegistered(string address);
    }
}
