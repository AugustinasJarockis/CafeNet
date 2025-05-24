using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class DiscountMapper
    {
        public static Discount ToDiscount(this CreateDiscountRequest request) {
            return new() { Code = request.Code, Percent = request.Percent, Amount = request.Amount };
        }

        public static Discount ToDiscount(this Discount discount, UpdateDiscountRequest request) {
            discount.Id = request.Id;
            discount.Code = request.Code;
            discount.Amount = request.Amount;
            discount.Percent = request.Percent;
            discount.Version = request.Version;
            return discount;
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
