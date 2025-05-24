using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Interfaces
{
    public interface ITaxService
    {
        Task<Tax> CreateAsync(CreateTaxRequest request);
        List<Tax> GetAll();
        Task DeleteAsync(long id);

        Task<Tax> UpdateAsync(UpdateTaxRequest updateTaxRequest);
    }
}
