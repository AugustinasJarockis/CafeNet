using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class LocationMapper
    {
        public static Location ToLocation(this CreateLocationRequest request) {
            return new(){ Address = request.Address };
        }

        public static LocationDto ToLocationDto(this Location location)
        {
            return new LocationDto
            {
                Id = location.Id,
                Address = location.Address,
                Version = location.Version
            };
        }

        public static Location ToLocation(this UpdateLocationRequest request)
        {
            return new()
            {
                Id = request.Id,
                Address = request.Address,
                Version = request.Version
            };
        }
    }
}
