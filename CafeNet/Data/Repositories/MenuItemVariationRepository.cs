using CafeNet.Data.Database;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public class MenuItemVariationRepository : IMenuItemVariationRepository
    {
        private readonly CafeNetDbContext _context;

        public MenuItemVariationRepository(CafeNetDbContext context) {
            _context = context;
        }

        public async Task<ICollection<MenuItemVariation>> CreateMultipleAsync(ICollection<MenuItemVariation> variation) {
            await _context.MenuItemVariations.AddRangeAsync(variation);
            await _context.SaveChangesAsync();
            return variation;
        }

        public async Task<bool> MenuItemVariationExistsAsync(long id) {
            return await _context.MenuItemVariations.AnyAsync(variation => variation.Id == id);
        }
    }
}
