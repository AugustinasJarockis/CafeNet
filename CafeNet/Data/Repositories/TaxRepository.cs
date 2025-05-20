using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class TaxRepository : ITaxRepository
    {
        private readonly CafeNetDbContext _context;

        public TaxRepository(CafeNetDbContext context) {
            _context = context;
        }

        public async Task<Tax> CreateAsync(Tax tax) {
            _context.Taxes.Add(tax);
            await _context.SaveChangesAsync();
            return tax;
        }
    }
}
