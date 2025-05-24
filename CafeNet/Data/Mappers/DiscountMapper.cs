using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class DiscountMapper
    {
        public static Discount ToDiscount(this CreateDiscountRequest request) {
            return new() { Code = request.Code, Percent = request.Percent, Amount = request.Amount };
        }

        public static Discount ToDiscount(this UpdateDiscountRequest request) {
            return new() {
                Id = request.Id,
                Code = request.Code,
                Amount = request.Amount,
                Percent = request.Percent,
                Version = request.Version
            };
        }
        public static DiscountDTO ToDiscountDTO(this Discount discount)
        {
            return new DiscountDTO
            {
                Id = discount.Id,
                Code = discount.Code,
                Percent = discount.Percent,
                Amount = discount.Amount,
                Version = discount.Version
            };
        }
    }
}
