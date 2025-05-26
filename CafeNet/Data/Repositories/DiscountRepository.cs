using CafeNet.Data.Database;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly CafeNetDbContext _context;

        public DiscountRepository(CafeNetDbContext context) {
            _context = context;
        }

        public async Task<Discount> CreateAsync(Discount discount) {
            _context.Discounts.Add(discount);
            await _context.SaveChangesAsync();
            return discount;
        }

        public async Task<Discount> UpdateAsync(Discount discount) {
            _context.Discounts.Update(discount);
            await _context.SaveChangesAsync();
            return discount;
        }

        public async Task<bool> CodeExistsAsync(string code) {
            return await _context.Discounts.AnyAsync(d => d.Code == code);
        }

        public async Task<string?> GetCodeById(long id) {
            return await _context.Discounts
                .AsNoTracking()
                .Where(discount => discount.Id == id)
                .Select(discount => discount.Code)
                .FirstOrDefaultAsync();
        }

        public async Task<Discount?> GetByIdAsync(long id)
        {
            return await _context.Discounts.FirstOrDefaultAsync(discount => discount.Id == id);
        }

        public void DeleteById(long id)
        {
            var discount = _context.Discounts.FirstOrDefault(d => d.Id == id);
            if (discount != null)
            {
                _context.Discounts.Remove(discount);
                _context.SaveChanges();
            }
        }

        public async Task<int> CountDiscountsAsync()
        {
            return await _context.Discounts.CountAsync();
        }

        public async Task<Discount> GetByCodeAsync(string code)
        {
            return await _context.Discounts.FirstOrDefaultAsync(discount => discount.Code == code);
        }


        public async Task<IEnumerable<Discount>> GetDiscountsPagedAsync(int pageNumber, int pageSize)
        {
            return await _context.Discounts
                                 .Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

    }
}
