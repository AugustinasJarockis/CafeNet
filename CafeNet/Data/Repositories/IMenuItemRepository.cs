using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IMenuItemRepository
    {
        public Task<MenuItem> CreateAsync(MenuItem item);
        public Task<IEnumerable<MenuItem>> GetMenuItemsPagedAsync(int pageNumber, int pageSize);
        public Task<int> CountMenuItemsAsync();
        public Task<MenuItem> GetByIdAsync(long id);
        public void DeleteById(long id);
    }
}
