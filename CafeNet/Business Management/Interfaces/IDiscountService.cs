using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces
{
    public interface IDiscountService
    {
        Task<Discount> CreateAsync(CreateDiscountRequest request);
        Task<PagedResult<DiscountDto>> GetDiscountsAsync(int pageNumber, int pageSize);
        Task DeleteAsync(long id);
    }
}
