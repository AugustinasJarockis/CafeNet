using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;
using System.Linq;

namespace CafeNet.Data.Mappers
{
    public static class OrderMapper
    {
        public static OrderDTO ToOrderDTO(this Order order)
        {
            return new OrderDTO
            {
                Id = order.Id,
                Status = order.Status,
                DiscountId = order.DiscountId,
                LocationId = order.LocationId,
                UserId = order.UserId,
                Version = order.Version,
                Discount = order.Discount?.ToDiscountDTO(),
                PaymentStatus = order.Payment?.Status ?? PaymentStatus.PENDING, 
                OrderItems = (order.OrderItems?
                    .Select(oi => oi.ToOrderItemDTO())
                    .ToList() ?? new List<OrderItemDTO>())
            };
        }

        public static OrderItemDTO ToOrderItemDTO(this OrderItem orderItem)
        {
            return new OrderItemDTO
            {
                Id = orderItem.Id,
                Refunded = orderItem.Refunded,
                OrderId = orderItem.OrderId,
                MenuItemId = orderItem.MenuItemId,
                Version = orderItem.Version,
                MenuItem = orderItem.MenuItem?.ToMenuItemOrderListDTO(),
                OrderItemVariations = (orderItem.OrderItemVariations?
                    .Select(oiv => oiv.ToOrderItemVariationDTO())
                    .ToList() ?? new List<OrderItemVariationDTO>())
                
            };
        }

        public static OrderItemVariationDTO ToOrderItemVariationDTO(this OrderItemVariation variation)
        {
            return new OrderItemVariationDTO
            {
                Id = variation.Id,
                OrderItemId = variation.OrderItemId,
                MenuItemVariationId = variation.MenuItemVariationId,
                Version = variation.Version,
                MenuItemVariation = variation.MenuItemVariation.ToMenuVariationDTO()
            };
        }
    }
}
