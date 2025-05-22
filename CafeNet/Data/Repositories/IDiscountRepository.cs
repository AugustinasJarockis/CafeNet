using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IDiscountRepository
    {
        public Task<Discount> CreateAsync(Discount discount);

        public Task<bool> CodeExistsAsync(string code); 
    }
}
