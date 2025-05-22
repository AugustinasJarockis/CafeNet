using CafeNet.Data.Database;
using CafeNet.Data.Models;

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
    }
}
