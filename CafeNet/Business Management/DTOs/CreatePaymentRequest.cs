using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;

public class CreatePaymentRequest
{
    public decimal TotalPrice { get; set; }
    public decimal UsedCredits { get; set; }
    public PaymentMethod Method { get; set; }
    public long UserId { get; set; }
    public long LocationId { get; set; }
    public long DiscountId { get; set; }

    public List<CreateOrderItemRequest> OrderItems { get; set; }
}

