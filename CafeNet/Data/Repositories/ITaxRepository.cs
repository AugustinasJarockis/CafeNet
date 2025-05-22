using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ITaxRepository
    {
        Task<Tax> CreateAsync(Tax tax);
        List<Tax> GetTaxes();
    }
}
