using CafeNet.Business_Management.DTOs;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces;

public interface IOrderService
{
    public Task<long> CreateOrderAsync(CreateOrderDTO createOrderDTO);
    public Task<PagedResult<OrderDTO>> GetOrdersByLocationAsync(long id, int pageNumber, int pageSize);
}
