using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;

public class CreateOrderDTO
{
    public long UserId { get; set; }
    public long LocationId { get; set; }
    public OrderStatus OrderStatus { get; set; }
    public long DiscountId { get; set; }
    public required List<CreateOrderItemRequest> OrderItems { get; set; }
}
