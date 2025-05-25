using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IOrderItemVariationRepository
    {
        public Task<OrderItemVariation> CreateAsync(OrderItemVariation orderItemVariation);

    }
}
