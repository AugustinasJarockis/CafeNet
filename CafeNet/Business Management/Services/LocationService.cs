using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services
{
    public class LocationService(ILocationRepository locationRepository) : ILocationService
    {
        private readonly ILocationRepository _locationRepository = locationRepository;

        public List<Location> GetAll ()
        {
            return _locationRepository.GetLocations();
        }
    }
}
