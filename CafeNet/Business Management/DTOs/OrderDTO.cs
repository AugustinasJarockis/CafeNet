using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs
{
    public class OrderDTO
    {
        public long Id { get; set; }
        public OrderStatus Status { get; set; }
        public long? DiscountId { get; set; }
        public long LocationId { get; set; }
        public long UserId { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public ICollection<OrderItemDTO> OrderItems { get; set; }
        public DiscountDTO? Discount { get; set; }
        public LocationDTO? Location { get; set; }
        public uint Version { get; set; }
    }
}
