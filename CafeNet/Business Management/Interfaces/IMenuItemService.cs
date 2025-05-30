﻿using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces
{
    public interface IMenuItemService
    {
        Task<MenuItem> CreateAsync(CreateMenuItemRequest request);
        Task<PagedResult<MenuItemDTO>> GetMenuItemsAsync(int pageNumber, int pageSize);
        Task DeleteAsync(long id);
        Task<MenuItemDTO> UpdateAvailabilityAsync(UpdateItemAvailabilityRequest request);
        Task<List<MenuItem>> GetMenuItemsByTaxIdAsync(long id);
        Task<MenuItem> UpdateAsync(UpdateMenuItemRequest updateMenuItemRequest);
        Task<MenuItemDTO> GetMenuItemAsync(long id);
    }
}
