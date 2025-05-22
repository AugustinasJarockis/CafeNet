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

        public async Task<bool> CodeExistsAsync(string code) {
            return await _context.Discounts.AnyAsync(d => d.Code == code);
        }
    }
}
