using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    [Loggable]
    public async Task<long> CreateOrderAsync(CreateOrderDTO createOrderDTO)
    {
        var order = new Order
        {
            UserId = createOrderDTO.UserId,
            LocationId = createOrderDTO.LocationId,
            Status = createOrderDTO.OrderStatus,
            DiscountId = createOrderDTO.DiscountId,
            OrderItems = new List<OrderItem>()
        };

        foreach (var itemDTO in createOrderDTO.OrderItems)
        {
            var orderItem = new OrderItem
            {
                MenuItemId = itemDTO.MenuItemId,
                Refunded = false,
                Order = order,
                OrderItemVariations = new List<OrderItemVariation>(),
            };

            foreach (var variationId in itemDTO.MenuItemVariationIds)
            {
                var variation = new OrderItemVariation
                {
                    MenuItemVariationId = variationId,
                    OrderItem = orderItem
                };

                orderItem.OrderItemVariations.Add(variation);
            }

            order.OrderItems.Add(orderItem);
        }

        await _orderRepository.CreateAsync(order);

        return order.Id;
    }

    [Loggable]
    public async Task<PagedResult<OrderDTO>> GetOrdersByLocationAsync(long id, int pageNumber, int pageSize)
    {
        var totalCount = await _orderRepository.CountOrdersAsync();
        var orders = await _orderRepository.GetOrdersByLocationPagedAsync(id, pageNumber, pageSize);

        var items = orders.Select(OrderMapper.ToOrderDTO).ToList();

        return new PagedResult<OrderDTO>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }
}

