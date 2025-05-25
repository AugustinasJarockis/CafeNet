namespace CafeNet.Business_Management.DTOs;

public class CreateOrderItemRequest
{
    public long MenuItemId { get; set; }
    public int Quantity { get; set; } = 1;
    public List<long> MenuItemVariationIds { get; set; } = new();
}
