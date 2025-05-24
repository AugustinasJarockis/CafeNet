using CafeNet.Data.Database;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly CafeNetDbContext _context;

        public PaymentRepository(CafeNetDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> CreateAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            return payment;
        }
    }
}
