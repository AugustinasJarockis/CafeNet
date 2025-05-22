using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IMenuItemRepository
    {
        public Task<MenuItem> CreateAsync(MenuItem item);
    }
}
