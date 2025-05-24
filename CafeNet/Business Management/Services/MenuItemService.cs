using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Business_Management.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly IMenuItemRepository _menuItemRepository;
        private readonly IMenuItemVariationRepository _menuItemVariationRepository;
        private readonly IUnitOfWork _unitOfWork;

        public MenuItemService(IMenuItemRepository menuItemRepository, 
                               IMenuItemVariationRepository menuItemVariationRepository,
                               IUnitOfWork unitOfWork)
        {
            _menuItemRepository = menuItemRepository;
            _menuItemVariationRepository = menuItemVariationRepository;
            _unitOfWork = unitOfWork;
        }

        [Loggable]
        public async Task<MenuItem> CreateAsync(CreateMenuItemRequest request) {
            var menuItem = request.ToMenuItem();
            
            await _unitOfWork.BeginTransactionAsync();
            try {
                ICollection<MenuItemVariation> variations = menuItem.MenuItemVariations;
                menuItem.MenuItemVariations = [];

                menuItem = await _menuItemRepository.CreateAsync(menuItem);

                variations = variations.Select(var => {
                    var.MenuItemId = menuItem.Id;
                    return var;
                }).ToList();
                await _menuItemVariationRepository.CreateMultipleAsync(variations);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return menuItem;
            }
            catch {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        [Loggable]
        public async Task<PagedResult<MenuItemDTO>> GetMenuItemsAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _menuItemRepository.CountMenuItemsAsync();
            var menuItems = await _menuItemRepository.GetMenuItemsPagedAsync(pageNumber, pageSize);

            var items = menuItems.Select(MenuItemMapper.ToMenuItemDTO).ToList();

            return new PagedResult<MenuItemDTO>
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
                var menuItem = await _menuItemRepository.GetByIdAsync(id) ?? throw new NotFoundException();

                _menuItemRepository.DeleteById(menuItem.Id);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        [Loggable]
        public async Task<MenuItemDTO> UpdateAvailabilityAsync(UpdateItemAvailabilityRequest request)
        {
            if (!(await _menuItemRepository.MenuItemExistsAsync(request.Id)))
                throw new NotFoundException("Menu item was not found.");

            try
            {
                var updatedMenuItem = await _menuItemRepository.UpdateAvailabilityAsync(request);
                return updatedMenuItem.ToMenuItemDTO();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new ConflictException("Item availability was modified in another session.");
            }
        }


        [Loggable]
        public async Task<List<MenuItem>> GetMenuItemsByTaxIdAsync(long id)
        {
            return await _menuItemRepository.GetByTaxIdAsync(id);
        }
    }
}
