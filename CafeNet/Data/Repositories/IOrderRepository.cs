using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> CreateAsync(Order order);
        public Task<IEnumerable<Order>> GetOrdersByLocationPagedAsync(long id, int pageNumber, int pageSize);
        public Task<int> CountOrdersAsync();
        public Task<bool> OrderExistsAsync(long id);
        public Task<Order> UpdateOrderStatusAsync(UpdateOrderStatusRequest request);
        public Task<Order> GetOrderByIdAsync(long orderId);
    }
}
