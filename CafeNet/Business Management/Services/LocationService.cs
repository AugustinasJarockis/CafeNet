using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
﻿using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Data.Enums;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Services
{
    public class LocationService(ILocationRepository locationRepository) : ILocationService
    {
        private readonly ILocationRepository _locationRepository = locationRepository;

        [Loggable]
        public List<Location> GetAll ()
        {
            return _locationRepository.GetLocations();
        }

        [Loggable]
        public async Task<Location> CreateAsync(CreateLocationRequest request) {
            var location = request.ToLocation();
            if (_locationRepository.AddressAlreadyRegistered(location.Address))
                throw new ConflictException("A location with this address already exists");
            return await _locationRepository.CreateAsync(location);
        }

        [Loggable]
        public async Task<PagedResult<UserDto>> GetLocationsAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _locationRepository.CountLocations();
            var locations = await _locationRepository.GetLocations(pageNumber, pageSize);

            var items = users.Select(UserMapper.ToUserDto).ToList();

            return new PagedResult<UserDto>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }
    }
}
