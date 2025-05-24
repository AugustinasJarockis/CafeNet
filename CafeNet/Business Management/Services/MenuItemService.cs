using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

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
        public async Task<List<MenuItem>> GetMenuItemsByTaxIdAsync(long id)
        {
            return await _menuItemRepository.GetByTaxIdAsync(id);
        }
    }
}
