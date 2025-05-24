using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
﻿using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Data.Enums;
using CafeNet.Infrastructure.Pagination;
using CafeNet.Data.Database;

namespace CafeNet.Business_Management.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        
        public LocationService(ILocationRepository locationRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _locationRepository = locationRepository;
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
        }

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
        public async Task<PagedResult<LocationDTO>> GetLocationsAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _locationRepository.CountLocationsAsync();
            var locations = await _locationRepository.GetLocationsPagedAsync(pageNumber, pageSize);

            var items = locations.Select(LocationMapper.ToLocationDTO).ToList();

            return new PagedResult<LocationDTO>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        [Loggable]
        public async Task DeleteAsync(long id)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var location = await _locationRepository.GetByIdAsync(id) ?? throw new NotFoundException();

                var fallbackLocation = await _locationRepository.GetFirstLocationExceptAsync(id);

                if (fallbackLocation == null)
                    throw new InvalidOperationException("No other location available to reassign clients.");

                var employeeRoles = new[] { UserRoles.CLIENT };
                var clients = await _userRepository.GetByLocationIdAndRolesAsync(employeeRoles, id);

                foreach (var client in clients)
                {
                    client.LocationId = fallbackLocation.Id;
                }

                _locationRepository.DeleteById(location.Id);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }
    }
}
