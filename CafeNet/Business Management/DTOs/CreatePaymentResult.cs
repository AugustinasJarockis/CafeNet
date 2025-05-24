namespace CafeNet.Business_Management.DTOs;

public class CreatePaymentResult
{
    public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }
    public long PaymentId { get; set; }
    public long OrderId { get; set;}
}
