using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public interface IDiscountRepository
    {
        public Task<Discount> CreateAsync(Discount discount);
        public Task<bool> CodeExistsAsync(string code);

        public Task<Discount> GetByIdAsync(long id);
        public void DeleteById(long id);
        public Task<int> CountDiscountsAsync();
        public Task<IEnumerable<Discount>> GetDiscountsPagedAsync(int pageNumber, int pageSize);
    }
}
