using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IPaymentRepository
    {
        public Task<Payment> CreateAsync(Payment payment);
    }
}
