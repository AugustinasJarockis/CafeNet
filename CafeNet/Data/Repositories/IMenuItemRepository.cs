using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IMenuItemRepository
    {
        public Task<MenuItem> CreateAsync(MenuItem item);
        public Task<IEnumerable<MenuItem>> GetMenuItemsPagedAsync(int pageNumber, int pageSize);
        public Task<int> CountMenuItemsAsync();
        public Task<bool> IsTitleTakenAsync(string title, long? excludeId = null);
        public Task<bool> MenuItemExistsAsync(long id);
        public Task<bool> AvailableMenuItemExistsAsync(long id);
        public Task<MenuItem?> GetByIdAsync(long id);
        public void DeleteById(long id);
        public Task<MenuItem> UpdateAvailabilityAsync(UpdateItemAvailabilityRequest request);
        public Task<List<MenuItem>> GetByTaxIdAsync(long id);
        public Task<MenuItem> UpdateAsync(MenuItem menuItem);
    }
}
