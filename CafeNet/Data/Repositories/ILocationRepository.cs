using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ILocationRepository
    {
        public List<Location> GetLocations();
    }
}
