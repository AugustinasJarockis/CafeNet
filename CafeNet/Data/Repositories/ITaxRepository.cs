using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ITaxRepository
    {
        public List<Tax> GetAllTaxes();
        public Task<Tax> CreateAsync(Tax tax);
        public List<Tax> GetTaxes();
        public Task<Tax> GetByIdAsync(long id);
        public void DeleteById(long id);
    }
}
