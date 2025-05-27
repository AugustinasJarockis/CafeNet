using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Mappers;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Business_Management.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepository _discountRepository;
        public DiscountService(IDiscountRepository discountRepository, IUnitOfWork unitOfWork) {
            _discountRepository = discountRepository;
        }

        [Loggable]
        public async Task<DiscountDTO> CreateAsync(CreateDiscountRequest request) {
            if (!(request.Percent == null || request.Amount == null) || (request.Percent == null && request.Amount == null))
                throw new BadRequestException();

            if (request.Percent != null && request.Percent > 100)
                throw new BadRequestException("Discount percentage can not exceed 100%");

            if (request.Percent != null && request.Percent < 0)
                throw new BadRequestException("Discount percentage can not be lower than 0%");

            if (await _discountRepository.CodeExistsAsync(request.Code))
                throw new ConflictException("Discount with specified code already exists");

            var discount = request.ToDiscount();
            return (await _discountRepository.CreateAsync(discount)).ToDiscountDTO();
        }

        [Loggable]
        public async Task<PagedResult<DiscountDTO>> GetDiscountsAsync(int pageNumber, int pageSize){
            var totalCount = await _discountRepository.CountDiscountsAsync();
            var discounts = await _discountRepository.GetDiscountsPagedAsync(pageNumber, pageSize);

            var items = discounts.Select(DiscountMapper.ToDiscountDTO).ToList();

            return new PagedResult<DiscountDTO>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        [Loggable]
        public async Task<DiscountDTO> GetDiscountAsync(long id) {
            var discount = await _discountRepository.GetByIdAsync(id)
                ?? throw new NotFoundException("Discount not found");
            return discount.ToDiscountDTO();
        }

        [Loggable]
        public async Task<DiscountDTO> GetDiscountByCodeAsync(string code)
        {
            var discount = await _discountRepository.GetByCodeAsync(code)
                ?? throw new NotFoundException("Discount not found");
            return discount.ToDiscountDTO();
        }


        [Loggable]
        public async Task<DiscountDTO> UpdateAsync(UpdateDiscountRequest request) {
            try {
                if (!(request.Percent == null || request.Amount == null) || (request.Percent == null && request.Amount == null))
                    throw new BadRequestException();

                var discountCode = await _discountRepository.GetCodeById(request.Id)
                    ?? throw new NotFoundException("Discount not found");

                if (request.Code != discountCode && await _discountRepository.CodeExistsAsync(request.Code))
                    throw new ConflictException("Discount with specified code already exists");

                var discount = request.ToDiscount();
                return (await _discountRepository.UpdateAsync(discount)).ToDiscountDTO();
            }
            catch (DbUpdateConcurrencyException) {
                throw new ConflictException("Discount was modified in another session.");
            }
        }

        [Loggable]
        public async Task DeleteAsync(long id)
        {
            var discount = await _discountRepository.GetByIdAsync(id) ?? throw new NotFoundException();
            _discountRepository.DeleteById(discount.Id);
        }
    }
}
