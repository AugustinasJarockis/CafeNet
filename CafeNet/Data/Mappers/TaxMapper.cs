using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class TaxMapper
    {
        public static Tax ToTax(this CreateTaxRequest request) {
            return new() { Percent = request.Percent, Type = request.Type };
        }

        public static Tax ToTax(this UpdateTaxRequest request) {
            return new()
            {
                Id = request.Id,
                Percent = request.Percent,
                Type = request.Type,
                Version = request.Version
            };
        }
    }
}
