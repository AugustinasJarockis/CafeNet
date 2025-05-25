using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

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
}
