using CafeNet.Business_Management.DTOs;

namespace CafeNet.Business_Management.Interfaces;

public interface IPaymentService
{
    public Task<long> CreatePaymentAsync(CreatePaymentDTO dto);
    public Task<(string ClientSecret, string PaymentIntentId)> ProcessStripePaymentAsync(CreatePaymentRequest createPaymentRequest);
}
