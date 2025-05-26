using CafeNet.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Business_Management.DTOs
{
    public class OrderItemVariationDTO
    {
        public long Id { get; set; }
        public long MenuItemVariationId { get; set; }
        public long OrderItemId { get; set; }
        public MenuItemVariationDTO MenuItemVariation { get; set; }
        public uint Version { get; set; }
    }
}
