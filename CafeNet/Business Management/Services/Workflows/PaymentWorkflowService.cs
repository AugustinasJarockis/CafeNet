using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Interfaces.Workflows;
using CafeNet.Data.Database;
using CafeNet.Data.Enums;

namespace CafeNet.Business_Management.Services.Workflows
{
    public class PaymentWorkflowService : IPaymentWorkflowService
    {
        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;
        private readonly IUnitOfWork _unitOfWork;

        public PaymentWorkflowService(
            IOrderService orderService,
            IPaymentService paymentService,
            IUnitOfWork unitOfWork)
        {
            _orderService = orderService;
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
        }

        [Loggable]
        public async Task<CreatePaymentResult> CreatePaymentWithOrderAsync(CreatePaymentRequest request)
        {
            await _unitOfWork.BeginTransactionAsync();

            try
            {
                var orderId = await _orderService.CreateOrderAsync(new CreateOrderDTO
                {
                    UserId = request.UserId,
                    LocationId = request.LocationId,
                    OrderStatus = OrderStatus.OPEN,
                    DiscountId = request.DiscountId,
                    OrderItems = request.OrderItems
                });

                var paymentId = await _paymentService.CreatePaymentAsync(new CreatePaymentDTO
                {
                    OrderId = orderId,
                    UserId = request.UserId,
                    TotalPrice = request.TotalPrice,
                    UsedCredits = request.UsedCredits,
                    Method = request.Method,
                    Status = PaymentStatus.PENDING
                });

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();

                return new CreatePaymentResult
                {
                    IsSuccess = true,
                    PaymentId = paymentId,
                    OrderId = orderId
                };
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

    }
}
