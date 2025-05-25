using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> CreateAsync(Order order);
        public Task<IEnumerable<Order>> GetOrdersByLocationPagedAsync(long id, int pageNumber, int pageSize);
        public Task<int> CountOrdersAsync();
    }
}
