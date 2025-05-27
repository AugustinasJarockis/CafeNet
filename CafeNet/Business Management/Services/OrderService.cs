using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;
using Microsoft.EntityFrameworkCore;
using CafeNet.BusinessManagement.Interfaces;
using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IDiscountRepository _discountRepository;
    private readonly ILocationRepository _locationRepository;
    private readonly IMenuItemRepository _menuItemRepository;
    private readonly IMenuItemVariationRepository _menuItemVariationRepository;
    private readonly IPaymentRepository _paymentRepository;
    private readonly INotificationSender _notificationSender;

    public OrderService(
        IOrderRepository orderRepository,
        IDiscountRepository discountRepository,
        ILocationRepository locationRepository,
        IMenuItemRepository menuItemRepository,
        IMenuItemVariationRepository menuItemVariationRepository,
        IPaymentRepository paymentRepository,
        INotificationSender notificationSender
    )
    {
        _orderRepository = orderRepository;
        _discountRepository = discountRepository;
        _locationRepository = locationRepository;
        _menuItemRepository = menuItemRepository;
        _menuItemVariationRepository = menuItemVariationRepository;
        _paymentRepository = paymentRepository;
        _notificationSender = notificationSender;
    }

    [Loggable]
    public async Task<long> CreateOrderAsync(CreateOrderDTO createOrderDTO)
    {
        if (createOrderDTO.DiscountId != null && !(await _discountRepository.DiscountExistsAsync(createOrderDTO.DiscountId ?? 0)))
            throw new NotFoundException("The specified order discount was not found");

        if (!(await _locationRepository.LocationExistsAsync(createOrderDTO.LocationId)))
            throw new NotFoundException("The specified order location was not found");

        foreach (var orderItem in createOrderDTO.OrderItems) {
            if (!(await _menuItemRepository.AvailableMenuItemExistsAsync(orderItem.MenuItemId)))
                throw new NotFoundException($"The menu item with id {orderItem.MenuItemId} was not found");

            foreach (var variationId in orderItem.MenuItemVariationIds) {
                if (!(await _menuItemVariationRepository.MenuItemVariationExistsAsync(variationId)))
                    throw new NotFoundException($"The menu item variation with id {variationId} was not found");
            }
        }

        var order = new Order {
            UserId = createOrderDTO.UserId,
            LocationId = createOrderDTO.LocationId,
            Status = createOrderDTO.OrderStatus,
            DiscountId = createOrderDTO.DiscountId != 0 ? createOrderDTO.DiscountId : null,
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
        var totalCount = await _orderRepository.CountOrdersByLocationAsync(id);
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
        if (!await _orderRepository.OrderExistsAsync(request.Id))
            throw new NotFoundException("Order was not found.");

        try
        {
            var updatedOrder = await _orderRepository.UpdateOrderStatusAsync(request);

            if (request.Status == OrderStatus.DONE)
            {
                var orderWithUser = await _orderRepository.GetOrderByIdAsync(request.Id);
                var message = $"Your order #{updatedOrder.Id} is ready for pickup";
                if (orderWithUser?.User != null)
                {
                    await _notificationSender.SendAsync(orderWithUser.User, message);
                }
            }
            return updatedOrder.ToOrderDTO();
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConflictException("Order status was modified in another session.");
        }
    }

    [Loggable]
    public async Task<bool> MarkPaymentAsPaidAsync(long orderId)
    {
        return await _paymentRepository.MarkPaymentAsPaidAsync(orderId);
    }

    [Loggable]
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
    public async Task<decimal> CalculateTotalPrice(long orderId) {
        return await _orderRepository.CalculateTotalPrice(orderId);
    }
}

