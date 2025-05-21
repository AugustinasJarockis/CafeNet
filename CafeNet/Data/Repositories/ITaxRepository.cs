using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ITaxRepository
    {
        public Task<Tax> CreateAsync(Tax tax);
    }
}
