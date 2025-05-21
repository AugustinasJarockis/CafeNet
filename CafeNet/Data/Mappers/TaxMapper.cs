using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class TaxMapper
    {
        public static Tax ToTax(this CreateTaxRequest request) {
            return new() { Percent = request.Percent, Type = request.Type };
        }
    }
}
