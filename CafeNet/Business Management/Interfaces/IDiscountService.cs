using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces
{
    public interface IDiscountService
    {
        Task<DiscountDTO> CreateAsync(CreateDiscountRequest request);
        Task<PagedResult<DiscountDTO>> GetDiscountsAsync(int pageNumber, int pageSize);
        Task<DiscountDTO> GetDiscountAsync(long id);
        Task<DiscountDTO> UpdateAsync(UpdateDiscountRequest request);
        Task DeleteAsync(long id);
    }
}
