using CafeNet.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Business_Management.DTOs
{
    public class OrderItemDTO
    {
        public long Id { get; set; }
        public bool Refunded { get; set; }
        public long OrderId { get; set; }
        public long MenuItemId { get; set; }
        public ICollection<OrderItemVariation> OrderItemVariations { get; set; }
        public uint Version { get; set; }
    }
}
