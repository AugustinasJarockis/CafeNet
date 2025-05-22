using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class DiscountMapper
    {
        public static Discount ToDiscount(this CreateDiscountRequest request) {
            return new() { Code = request.Code, Percent = request.Percent, Amount = request.Amount };
        }
        public static DiscountDto ToDiscountDto(this Discount discount)
        {
            return new DiscountDto
            {
                Id = discount.Id,
                Code = discount.Code,
                Percent = discount.Percent,
                Amount = discount.Amount
            };
        }
    }
}
