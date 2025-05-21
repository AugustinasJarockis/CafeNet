using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ILocationRepository
    {
        public List<Location> GetLocations();
        public Task<Location> CreateAsync(Location location);
        public Task<Location> GetByIdAsync(long id);
        public bool AddressAlreadyRegistered(string address);
        public Task<IEnumerable<Location>> GetLocationsPagedAsync(int pageNumber, int pageSize);
        public Task<int> CountLocationsAsync();
        public Task<Location?> GetFirstLocationExceptAsync(long excludedLocationId);
        public void DeleteById(long id);
    }
}
