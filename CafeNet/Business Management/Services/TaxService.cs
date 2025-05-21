using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;

namespace CafeNet.Business_Management.Services
{
    public class TaxService(ITaxRepository taxRepository) : ITaxService
    {
        private readonly ITaxRepository _taxRepository = taxRepository;

        [Loggable]
        public async Task<Tax> CreateAsync(CreateTaxRequest request) {
            var tax = request.ToTax();
            return await _taxRepository.CreateAsync(tax);
        }
    }
}
