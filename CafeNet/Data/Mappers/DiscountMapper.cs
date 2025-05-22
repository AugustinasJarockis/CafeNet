using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class DiscountMapper
    {
        public static Discount ToDiscount(this CreateDiscountRequest request) {
            return new() { Code = request.Code, Percent = request.Percent, Amount = request.Amount };
        }
    }
}
