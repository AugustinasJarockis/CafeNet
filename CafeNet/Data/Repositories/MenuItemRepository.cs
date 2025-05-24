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

        public async Task<MenuItem> GetByIdAsync(long id)
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
                .Include(m => m.MenuItemVariations)
                .Include(m => m.Tax)
                .FirstOrDefaultAsync(m => m.Id == request.Id);

            if (menuItem == null)
                throw new KeyNotFoundException($"Menu item with ID {request.Id} not found.");

            menuItem.Available = request.Available;

            await _context.SaveChangesAsync();

            return new MenuItem
            {
                Id = menuItem.Id,
                Title = menuItem.Title,
                Price = menuItem.Price,
                Available = menuItem.Available,
                ImgPath = menuItem.ImgPath,
                TaxId = menuItem.TaxId,
                Version = menuItem.Version,
                MenuItemVariations = menuItem.MenuItemVariations.Select(v => new MenuItemVariation
                {
                    Id = v.Id,
                    MenuItemId = v.MenuItemId,
                    Title = v.Title,
                    PriceChange = v.PriceChange
                }).ToList(),
                Tax = menuItem.Tax
            };
        }


        public async Task<List<MenuItem>> GetByTaxIdAsync(long id)
        {
            return await _context.MenuItems.Where(t => t.TaxId == id).ToListAsync();
        }
    }
}
