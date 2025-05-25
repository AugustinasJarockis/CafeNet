using CafeNet.Data.Database;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

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
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<IEnumerable<Order>> GetOrdersByLocationPagedAsync(long id, int pageNumber, int pageSize)
        {
            return await _context.Orders
                                 .Where(o => o.LocationId == id)
                                 .Include(o => o.OrderItems)
                                     .ThenInclude(oi => oi.OrderItemVariations)
                                 .OrderBy(o => o.Id)
                                 .Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

        public async Task<int> CountOrdersAsync()
        {
            return await _context.Orders.CountAsync();
        }

    }
}
