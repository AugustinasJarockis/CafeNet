using CafeNet.Business_Management.DTOs;

namespace CafeNet.Business_Management.Interfaces.Workflows;

public interface IPaymentWorkflowService
{
    public Task<CreatePaymentResult> CreatePaymentWithOrderAsync(CreatePaymentRequest request);
}
