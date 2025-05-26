using CafeNet.Data.Database;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

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
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<bool> MarkPaymentAsPaidAsync(long orderId)
        {
            var payment = await _context.Payments
                .FirstOrDefaultAsync(p => p.OrderId == orderId);

            if (payment == null)
                return false;

            payment.Status = PaymentStatus.DONE;

            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
