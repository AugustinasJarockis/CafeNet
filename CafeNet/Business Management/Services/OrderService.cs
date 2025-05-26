using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Business_Management.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IPaymentRepository _paymentRepository;

    public OrderService(IOrderRepository orderRepository, IPaymentRepository paymentRepository)
    {
        _orderRepository = orderRepository;
        _paymentRepository = paymentRepository;
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
            int quantity = itemDTO.Quantity > 0 ? itemDTO.Quantity : 1;

            for (int i = 0; i < quantity; i++)
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

    [Loggable]
    public async Task<OrderDTO> UpdateOrderStatusAsync(UpdateOrderStatusRequest request)
    {
        if (!(await _orderRepository.OrderExistsAsync(request.Id)))
            throw new NotFoundException("Order was not found.");

        try
        {
            var updatedOrder = await _orderRepository.UpdateOrderStatusAsync(request);
            return updatedOrder.ToOrderDTO();
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConflictException("Order status was modified in another session.");
        }
        catch (Exception ex) {
            throw;
        }
    }

    public async Task<bool> MarkPaymentAsPaidAsync(long orderId)
    {
        return await _paymentRepository.MarkPaymentAsPaidAsync(orderId);
    }

    public async Task<PagedResult<OrderDTO>> GetOrdersByUserAsync(long id, int pageNumber, int pageSize)
    {
        var totalCount = await _orderRepository.CountOrdersByLocationAsync(id);
        var orders = await _orderRepository.GetOrdersByUserPagedAsync(id, pageNumber, pageSize);

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

