using CafeNet.Business_Management.DTOs;
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
                OrderItems = (ICollection<OrderItem>)(order.OrderItems?
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
                OrderItemVariations = (ICollection<OrderItemVariation>)(orderItem.OrderItemVariations?
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
                Version = variation.Version
            };
        }
    }
}
