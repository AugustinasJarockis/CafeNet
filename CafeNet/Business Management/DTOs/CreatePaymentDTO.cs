using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.DTOs;

public class CreatePaymentDTO
{
    public long OrderId { get; set; }
    public long UserId { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal UsedCredits { get; set; }
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; }
}
