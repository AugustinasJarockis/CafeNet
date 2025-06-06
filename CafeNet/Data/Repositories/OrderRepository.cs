﻿using CafeNet.Business_Management.DTOs;
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

        public async Task<Order?> GetOrderByIdAsync(long orderId)
        {
            return await _context.Orders
                .Where(o => o.Id == orderId)
                .Include(o => o.Location)
                .Include(o => o.User)
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

        private async Task<Order?> GetOrderByIdNoTrackingAsync(long orderId) {
            return await _context.Orders
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<Order> UpdateOrderStatusAsync(UpdateOrderStatusRequest request)
        {
            var order = await GetOrderByIdNoTrackingAsync(request.Id);

            order!.Status = request.Status;
            order.Version = request.Version;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return (await GetOrderByIdAsync(request.Id))!;
        }

        public async Task<decimal> CalculateTotalPrice(long orderId) {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(mi => mi.MenuItemVariations)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(mi => mi.Tax)
                .Include(o => o.Discount)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null) 
                return 0m;

            decimal priceBeforeDiscount = order.OrderItems.Sum(item =>
            {
                var menuItem = item.MenuItem;
                var basePrice = menuItem.Price;

                var selectedVariationIds = item.OrderItemVariations.Select(v => v.MenuItemVariationId).ToList();
                var variationTotal = menuItem.MenuItemVariations
                    .Where(v => selectedVariationIds.Contains(v.Id))
                    .Sum(v => v.PriceChange);
                var line = basePrice + variationTotal;

                var itemTotal = Math.Round((line * (1 + menuItem.Tax.Percent / 100m)),2, MidpointRounding.AwayFromZero);
                return itemTotal;
            });

            if (order.Discount == null)
                return priceBeforeDiscount;

            if (order.Discount.Amount != null)
                return Math.Max(0m, (decimal)(priceBeforeDiscount - (order.Discount.Amount)));

            if (order.Discount.Percent != null)
                return (decimal)(priceBeforeDiscount * (1 - (order.Discount.Percent! / 100)));
            return 0m;
        }
    }
}
