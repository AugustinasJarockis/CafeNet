using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepository _discountRepository;

        public DiscountService(IDiscountRepository discountRepository) {
            _discountRepository = discountRepository;
        }

        [Loggable]
        public async Task<Discount> CreateAsync(CreateDiscountRequest request) {
            if (!(request.Percent == null || request.Amount == null) || (request.Percent == null && request.Amount == null))
                throw new BadRequestException();

            if (await _discountRepository.CodeExistsAsync(request.Code))
                throw new ConflictException("Discount with specified code already exists");

            var discount = request.ToDiscount();
            return await _discountRepository.CreateAsync(discount);
        }
    }
}
