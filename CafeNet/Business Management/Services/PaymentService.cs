using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using Stripe;

namespace CafeNet.Business_Management.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public PaymentService(IPaymentRepository paymentRepository, IUnitOfWork unitOfWork)
    {
        _paymentRepository = paymentRepository;
        _unitOfWork = unitOfWork;
    }

    [Loggable]
    public async Task<long> CreatePaymentAsync(CreatePaymentDTO createPaymentDTO)
    {
        var payment = new Payment
        {
            OrderId = createPaymentDTO.OrderId,
            UserId = createPaymentDTO.UserId,
            TotalPrice = createPaymentDTO.TotalPrice,
            UsedCredits = createPaymentDTO.UsedCredits,
            Method = createPaymentDTO.Method,
            Status = createPaymentDTO.Status,
            RefundedAmount = 0
        };

        await _paymentRepository.CreateAsync(payment);

        await _unitOfWork.SaveChangesAsync();

        return payment.Id;
    }

    public async Task<(string ClientSecret, string PaymentIntentId)> ProcessStripePaymentAsync(CreatePaymentRequest createPaymentRequest)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(createPaymentRequest.TotalPrice * 100), // cents
            Currency = "eur",
            PaymentMethodTypes = new List<string> { "card" },

            // Optional: add metadata for traceability
            Metadata = new Dictionary<string, string>
        {
            { "UserId", createPaymentRequest.UserId.ToString() },
            { "LocationId", createPaymentRequest.LocationId.ToString() },
            { "DiscountId", createPaymentRequest.DiscountId?.ToString() ?? "none" }
        }
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        return (paymentIntent.ClientSecret, paymentIntent.Id);
    }

}
