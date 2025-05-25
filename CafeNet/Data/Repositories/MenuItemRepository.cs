using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Database;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

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
            return await _context.MenuItems.FirstOrDefaultAsync(menuItem => menuItem.Id == id);
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
            var existingMenuItem = await _context.MenuItems
                .Include(m => m.MenuItemVariations)
                .FirstOrDefaultAsync(m => m.Id == updatedMenuItem.Id);

            if (existingMenuItem == null)
            {
                throw new Exception($"MenuItem with ID {updatedMenuItem.Id} not found.");
            }

            // Update scalar properties
            existingMenuItem.Title = updatedMenuItem.Title;
            existingMenuItem.Price = updatedMenuItem.Price;
            existingMenuItem.Available = updatedMenuItem.Available;
            existingMenuItem.ImgPath = updatedMenuItem.ImgPath;
            existingMenuItem.TaxId = updatedMenuItem.TaxId;

            // --- Handle Variations ---
            // Remove variations not in updated list
            var updatedVariationIds = updatedMenuItem.MenuItemVariations.Select(v => v.Id).ToList();
            var variationsToRemove = existingMenuItem.MenuItemVariations
                .Where(v => !updatedVariationIds.Contains(v.Id))
                .ToList();

            foreach (var variation in variationsToRemove)
            {
                _context.MenuItemVariations.Remove(variation);
            }

            // Add or update variations
            foreach (var updatedVariation in updatedMenuItem.MenuItemVariations)
            {
                var existingVariation = existingMenuItem.MenuItemVariations
                    .FirstOrDefault(v => v.Id == updatedVariation.Id);

                if (existingVariation != null)
                {
                    // Update
                    existingVariation.Title = updatedVariation.Title;
                    existingVariation.PriceChange = updatedVariation.PriceChange;
                }
                else
                {
                    // Add new
                    existingMenuItem.MenuItemVariations.Add(new MenuItemVariation
                    {
                        Title = updatedVariation.Title,
                        PriceChange = updatedVariation.PriceChange,
                        MenuItemId = existingMenuItem.Id
                    });
                }
            }

            await _context.SaveChangesAsync();
            return existingMenuItem;
        }
    }
}
