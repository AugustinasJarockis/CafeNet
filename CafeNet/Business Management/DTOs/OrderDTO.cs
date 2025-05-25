using CafeNet.Data.Enums;
using CafeNet.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Business_Management.DTOs
{
    public class OrderDTO
    {
        public long Id { get; set; }
        public OrderStatus Status { get; set; }
        public long? DiscountId { get; set; }
        public long LocationId { get; set; }
        public long UserId { get; set; }
        public ICollection<OrderItemDTO> OrderItems { get; set; }
        public uint Version { get; set; }
    }
}
