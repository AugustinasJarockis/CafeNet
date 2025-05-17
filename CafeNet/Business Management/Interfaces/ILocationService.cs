using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Interfaces
{
    public interface ILocationService
    {
        public Task<Location> CreateAsync(CreateLocationRequest request);
    }
}
