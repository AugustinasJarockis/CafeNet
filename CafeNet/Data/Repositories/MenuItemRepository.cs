using CafeNet.Data.Database;
using CafeNet.Data.Models;

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
    }
}
