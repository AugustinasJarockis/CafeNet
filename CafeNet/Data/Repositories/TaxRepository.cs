using CafeNet.Data.Database;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public class TaxRepository : ITaxRepository
    {
        private readonly CafeNetDbContext _context;

        public TaxRepository(CafeNetDbContext context) {
            _context = context;
        }
        public async Task<Tax> CreateAsync(Tax tax)
        {
            _context.Taxes.Add(tax);
            await _context.SaveChangesAsync();
            return tax;
        }

        public async Task<bool> TaxExistsAsync(long id) {
            return await _context.Taxes.AnyAsync(tax => tax.Id == id);
        }
        public List<Tax> GetTaxes()
        {
            return [.._context.Taxes];
        }
        public async Task<Tax> GetByIdAsync(long id)
        {
            return await _context.Taxes
                .FirstOrDefaultAsync(u => u.Id == id);
        }
        public void DeleteById(long id)
        {
            var tax = _context.Taxes.FirstOrDefault(u => u.Id == id);
            if (tax != null)
            {
                _context.Taxes.Remove(tax);
                _context.SaveChanges();
            }
        }

        public async Task<Tax> UpdateAsync(Tax tax)
        {
            _context.Taxes.Update(tax);
            await _context.SaveChangesAsync();
            return tax;
        }
    }
}
