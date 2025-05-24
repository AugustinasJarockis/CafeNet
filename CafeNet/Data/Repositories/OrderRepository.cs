using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly CafeNetDbContext _context;

        public OrderRepository(CafeNetDbContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateAsync(Order order)
        {
            _context.Orders.Add(order);
            return order;
        }

    }
}
