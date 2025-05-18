using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services
{
    public class LocationService: ILocationService
    {
        private readonly ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository) {
            _locationRepository = locationRepository;
        }
        public async Task<Location> CreateAsync(CreateLocationRequest request) {
            var location = request.ToLocation();
            if (_locationRepository.AddressAlreadyRegistered(location.Address))
                throw new ConflictException("A location with this address already exists");
            return await _locationRepository.CreateAsync(location);
        }
    }
}
