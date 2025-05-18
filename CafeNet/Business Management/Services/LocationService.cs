using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services
{
    [Loggable]
    public class LocationService(ILocationRepository locationRepository) : ILocationService
    {
        private readonly ILocationRepository _locationRepository = locationRepository;

        public List<Location> GetAll ()
        {
            return _locationRepository.GetLocations();
        }
    }
}
