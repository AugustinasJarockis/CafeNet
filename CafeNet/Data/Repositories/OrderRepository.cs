using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Database;
using CafeNet.Data.Enums;
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

        public async Task<bool> OrderExistsAsync(long id)
        {
            return await _context.Orders.AnyAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetOrdersByLocationPagedAsync(long id, int pageNumber, int pageSize)
        {
            return await _context.Orders
                .Where(o => o.LocationId == id)
                .Include(o => o.Location) 
                .Include(o => o.Discount)
                .Include(o => o.Payment)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(mi => mi.Tax)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.OrderItemVariations)
                        .ThenInclude(oiv => oiv.MenuItemVariation)
                .OrderBy(o =>
                    o.Status == OrderStatus.OPEN ? 0 :
                    o.Status == OrderStatus.IN_PROGRESS ? 1 :
                    o.Status == OrderStatus.DONE ? 2 :
                    3)
                .ThenByDescending(o => o.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserPagedAsync(long userId, int pageNumber, int pageSize)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.Location)
                .Include(o => o.Discount)
                .Include(o => o.Payment)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(mi => mi.Tax)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.OrderItemVariations)
                        .ThenInclude(oiv => oiv.MenuItemVariation)
                .OrderBy(o =>
                    o.Status == OrderStatus.OPEN ? 0 :
                    o.Status == OrderStatus.IN_PROGRESS ? 1 :
                    o.Status == OrderStatus.DONE ? 2 :
                    3)
                .ThenByDescending(o => o.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<int> CountOrdersAsync()
        {
            return await _context.Orders.CountAsync();
        }

        public async Task<int> CountOrdersByLocationAsync(long locationId)
        {
            return await _context.Orders
                .Where(o => o.LocationId == locationId)
                .CountAsync();
        }

        public async Task<int> CountOrdersByUserAsync(long userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .CountAsync();
        }

        public async Task<Order> GetOrderByIdAsync(long orderId)
        {
            return await _context.Orders
                .Where(o => o.Id == orderId)
                .Include(o => o.Location)
                .Include(o => o.Discount)
                .Include(o => o.Payment)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(mi => mi.Tax)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.OrderItemVariations)
                        .ThenInclude(oiv => oiv.MenuItemVariation)
                .FirstOrDefaultAsync();
        }

        public async Task<Order> UpdateOrderStatusAsync(UpdateOrderStatusRequest request)
        {
            var order = await GetOrderByIdAsync(request.Id);

            order.Status = request.Status;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }

    }
}
