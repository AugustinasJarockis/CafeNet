using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> CreateAsync(Order order);
    }
}
