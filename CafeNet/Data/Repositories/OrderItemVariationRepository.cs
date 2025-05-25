using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class OrderItemVariationRepository : IOrderItemVariationRepository
    {
        private readonly CafeNetDbContext _context;

        public OrderItemVariationRepository(CafeNetDbContext context)
        {
            _context = context;
        }

        public async Task<OrderItemVariation> CreateAsync(OrderItemVariation orderItemVariation)
        {
            _context.OrderItemVariations.Add(orderItemVariation);
            await _context.SaveChangesAsync();
            return orderItemVariation;
        }
    }
}
