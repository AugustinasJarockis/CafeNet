using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IDiscountRepository
    {
        public Task<Discount> CreateAsync(Discount discount);
        public Task<Discount> UpdateAsync(Discount discount);
        public Task<bool> CodeExistsAsync(string code);
        public Task<string?> GetCodeById(long id);
        public Task<Discount?> GetByIdAsync(long id);
        public Task<Discount> GetByCodeAsync(string code);
        public void DeleteById(long id);
        public Task<int> CountDiscountsAsync();
        public Task<IEnumerable<Discount>> GetDiscountsPagedAsync(int pageNumber, int pageSize);
    }
}
