using CafeNet.Business_Management.DTOs;

namespace CafeNet.Business_Management.Interfaces;

public interface IOrderService
{
    public Task<long> CreateOrderAsync(CreateOrderDTO createOrderDTO);
}
