using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces
{
    public interface IMenuItemService
    {
        Task<MenuItem> CreateAsync(CreateMenuItemRequest request);
        Task<PagedResult<MenuItemDto>> GetMenuItemsAsync(int pageNumber, int pageSize);
        Task DeleteAsync(long id);
    }
}
