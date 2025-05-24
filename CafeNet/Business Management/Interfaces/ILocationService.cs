using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces
{
    public interface ILocationService
    {
        public List<Location> GetAll();
        public Task<Location> CreateAsync(CreateLocationRequest request);
        public Task<PagedResult<LocationDto>> GetLocationsAsync(int pageNumber, int pageSize);
        public Task DeleteAsync(long id);
        public Task<Location> UpdateLocationAsync(UpdateLocationRequest updateLocationRequest);
    }
}
