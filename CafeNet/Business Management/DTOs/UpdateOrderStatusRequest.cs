using CafeNet.Data.Enums;
using CafeNet.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Business_Management.DTOs
{
    public class UpdateOrderStatusRequest
    {
        public long Id { get; set; }
        public OrderStatus Status { get; set; }
        public uint Version { get; set; }
    }
}
