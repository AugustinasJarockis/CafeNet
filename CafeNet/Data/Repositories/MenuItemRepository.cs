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

        public async Task<MenuItem> UpdateAsync(MenuItem menuItem) {
            var remainingIds = menuItem.MenuItemVariations.Select(var => var.Id).ToList();
            var variationsToRemove = await _context.MenuItemVariations.Where(
                var => var.MenuItemId == menuItem.Id && !remainingIds.Contains(var.Id)
                ).ToListAsync();

            _context.MenuItems.Update(menuItem);
            RemoveObsoleteVariations(variationsToRemove);

            await _context.SaveChangesAsync();
            return menuItem;
        }
        private void RemoveObsoleteVariations(List<MenuItemVariation> variationsToRemove)
        {
            foreach (var variation in variationsToRemove)
            {
                _context.MenuItemVariations.Remove(variation);
            }
        }
    }
}
