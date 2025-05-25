using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly CafeNetDbContext _context;

        public OrderItemRepository(CafeNetDbContext context)
        {
            _context = context;
        }

        public async Task<OrderItem> CreateAsync(OrderItem orderItem)
        {
            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();
            return orderItem;
        }
    }
}
