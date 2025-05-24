using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderItemRepository _orderItemRepository;
    private readonly IOrderItemVariationRepository _variationRepository;

    public OrderService(
        IOrderRepository orderRepository,
        IOrderItemRepository orderItemRepository,
        IOrderItemVariationRepository variationRepository)
    {
        _orderRepository = orderRepository;
        _orderItemRepository = orderItemRepository;
        _variationRepository = variationRepository;
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

        await _orderRepository.CreateAsync(order);

        foreach (var itemDto in createOrderDTO.OrderItems)
        {
            var orderItem = new OrderItem
            {
                MenuItemId = itemDto.MenuItemId,
                Refunded = false,
                Order = order,
                OrderItemVariations = new List<OrderItemVariation>(),
            };

            foreach (var variationId in itemDto.MenuItemVariationIds)
            {
                var variation = new OrderItemVariation
                {
                    MenuItemVariationId = variationId,
                    OrderItem = orderItem
                };

                orderItem.OrderItemVariations.Add(variation);
                await _variationRepository.CreateAsync(variation);
            }

            order.OrderItems.Add(orderItem);
            await _orderItemRepository.CreateAsync(orderItem);
        }

        return order.Id;
    }
}

