using CafeNet.Business_Management.DTOs;

namespace CafeNet.Business_Management.Interfaces;

public interface IPaymentService
{
    public Task<long> CreatePaymentAsync(CreatePaymentDTO dto);
}
