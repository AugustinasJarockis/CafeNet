using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Database;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CafeNet.Data.Repositories
{
    public class MenuItemRepository : IMenuItemRepository
    {
        private readonly CafeNetDbContext _context;

        public MenuItemRepository(CafeNetDbContext context) {
            _context = context;
        }

        public async Task<MenuItem> CreateAsync(MenuItem item) {
            _context.MenuItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> MenuItemExistsAsync(long id) {
            return await _context.MenuItems.AnyAsync(item => item.Id == id);
        }

        public async Task<MenuItem?> GetByIdAsync(long id)
        {
            return await _context.MenuItems
                                    .Include(m => m.MenuItemVariations)
                                    .Include(m => m.Tax)
                                    .FirstOrDefaultAsync(menuItem => menuItem.Id == id);
        }
        public async Task<bool> IsTitleTakenAsync(string title, long? excludeId = null)
        {
            return await _context.MenuItems
                .AnyAsync(m => m.Title == title && (!excludeId.HasValue || m.Id != excludeId.Value));
        }

        public async Task<IEnumerable<MenuItem>> GetMenuItemsPagedAsync(int pageNumber, int pageSize)
        {
            return await _context.MenuItems
                                 .Include(m => m.MenuItemVariations)
                                 .Include(m => m.Tax)
                                 .Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

        public async Task<int> CountMenuItemsAsync()
        {
            return await _context.MenuItems.CountAsync();
        }

        public void DeleteById(long id)
        {
            var menuItem = _context.MenuItems.FirstOrDefault(u => u.Id == id);
            if (menuItem != null)
            {
                _context.MenuItems.Remove(menuItem);
                _context.SaveChanges();
            }
        }

        public async Task<MenuItem> UpdateAvailabilityAsync(UpdateItemAvailabilityRequest request)
        {
            var menuItem = await _context.MenuItems
                .AsNoTracking()
                .Include(m => m.MenuItemVariations)
                .Include(m => m.Tax)
                .FirstAsync(m => m.Id == request.Id);
            menuItem.Available = request.Available;
            menuItem.Version = request.Version;

            _context.MenuItems.Update(menuItem);
            await _context.SaveChangesAsync();

            return menuItem;
        }


        public async Task<List<MenuItem>> GetByTaxIdAsync(long id)
        {
            return await _context.MenuItems.Where(t => t.TaxId == id).ToListAsync();
        }

        public async Task<MenuItem> UpdateAsync(MenuItem updatedMenuItem)
        {
            var existingMenuItem = await GetExistingMenuItemAsync(updatedMenuItem.Id);

            UpdateScalarProperties(existingMenuItem, updatedMenuItem);
            UpdateVariations(existingMenuItem, updatedMenuItem.MenuItemVariations);

            await _context.SaveChangesAsync();
            return existingMenuItem;
        }

        private async Task<MenuItem> GetExistingMenuItemAsync(long id)
        {
            var item = await _context.MenuItems
                .Include(m => m.MenuItemVariations)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (item == null)
            {
                throw new Exception($"MenuItem with ID {id} not found.");
            }

            return item;
        }

        private void UpdateScalarProperties(MenuItem existing, MenuItem updated)
        {
            existing.Title = updated.Title;
            existing.Price = updated.Price;
            existing.Available = updated.Available;
            existing.ImgPath = updated.ImgPath;
            existing.TaxId = updated.TaxId;
        }

        private void UpdateVariations(MenuItem existing, ICollection<MenuItemVariation> updatedVariations)
        {
            var updatedIds = updatedVariations.Select(v => v.Id).ToList();

            RemoveObsoleteVariations(existing, updatedIds);
            AddOrUpdateVariations(existing, updatedVariations);
        }

        private void RemoveObsoleteVariations(MenuItem existing, List<long> updatedIds)
        {
            var toRemove = existing.MenuItemVariations
                .Where(v => !updatedIds.Contains(v.Id))
                .ToList();

            foreach (var variation in toRemove)
            {
                _context.MenuItemVariations.Remove(variation);
            }
        }

        private void AddOrUpdateVariations(MenuItem existing, ICollection<MenuItemVariation> updatedVariations)
        {
            foreach (var updated in updatedVariations)
            {
                var existingVariation = existing.MenuItemVariations
                    .FirstOrDefault(v => v.Id == updated.Id);

                if (existingVariation != null)
                {
                    existingVariation.Title = updated.Title;
                    existingVariation.PriceChange = updated.PriceChange;
                }
                else
                {
                    existing.MenuItemVariations.Add(new MenuItemVariation
                    {
                        Title = updated.Title,
                        PriceChange = updated.PriceChange,
                        MenuItemId = existing.Id
                    });
                }
            }
        }
    }
}
