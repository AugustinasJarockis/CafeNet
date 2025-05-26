using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IPaymentRepository
    {
        public Task<Payment> CreateAsync(Payment payment);
        Task<bool> MarkPaymentAsPaidAsync(long orderId);
    }
}
