using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IOrderItemRepository
    {
        public Task<OrderItem> CreateAsync(OrderItem orderItem);
    }
}   
