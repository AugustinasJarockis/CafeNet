using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public interface IMenuItemVariationRepository
    {
        public Task<ICollection<MenuItemVariation>> CreateMultipleAsync(ICollection<MenuItemVariation> variation);
        
        
    }
}
