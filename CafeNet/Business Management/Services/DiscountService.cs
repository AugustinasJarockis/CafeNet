using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Enums;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepository _discountRepository;
        private readonly IUnitOfWork _unitOfWork;
        public DiscountService(IDiscountRepository discountRepository, IUnitOfWork unitOfWork) {
            _discountRepository = discountRepository;
            _unitOfWork = unitOfWork;
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

        [Loggable]
        public async Task<PagedResult<DiscountDto>> GetDiscountsAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _discountRepository.CountDiscountsAsync();
            var discounts = await _discountRepository.GetDiscountsPagedAsync(pageNumber, pageSize);

            var items = discounts.Select(DiscountMapper.ToDiscountDto).ToList();

            return new PagedResult<DiscountDto>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        [Loggable]
        public async Task DeleteAsync(long id)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var discount = await _discountRepository.GetByIdAsync(id) ?? throw new NotFoundException();

                _discountRepository.DeleteById(discount.Id);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }
    }
}
