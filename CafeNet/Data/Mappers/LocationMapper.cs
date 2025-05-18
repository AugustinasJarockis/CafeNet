using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class LocationMapper
    {
        public static Location ToLocation(this CreateLocationRequest request) {
            return new(){ Address = request.Address };
        }
    }
}
