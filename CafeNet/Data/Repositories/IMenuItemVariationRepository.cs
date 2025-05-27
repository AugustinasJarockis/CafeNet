using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IMenuItemVariationRepository
    {
        public Task<ICollection<MenuItemVariation>> CreateMultipleAsync(ICollection<MenuItemVariation> variation);

        public Task<bool> MenuItemVariationExistsAsync(long id);
    }
}
