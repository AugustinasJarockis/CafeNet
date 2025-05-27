using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly IOrderService _orderService;
    private readonly IUnitOfWork _unitOfWork;

    public PaymentService(IPaymentRepository paymentRepository,
        IOrderService orderService,
        IUnitOfWork unitOfWork)
    {
        _paymentRepository = paymentRepository;
        _orderService = orderService;
        _unitOfWork = unitOfWork;
    }

    [Loggable]
    public async Task<long> CreatePaymentAsync(CreatePaymentDTO createPaymentDTO)
    {
        if (Math.Round(await _orderService.CalculateTotalPrice(createPaymentDTO.OrderId), 2) != Math.Round(createPaymentDTO.TotalPrice, 2))
            throw new BadRequestException("Total price does match total item price");

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
