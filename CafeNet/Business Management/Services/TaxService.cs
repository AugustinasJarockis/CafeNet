using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Database;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Business_Management.Services
{
    public class TaxService : ITaxService
    {
        private readonly ITaxRepository _taxRepository;
        private readonly IUnitOfWork _unitOfWork;
        public TaxService(ITaxRepository taxRepository, IUnitOfWork unitOfWork)
        {
            _taxRepository = taxRepository;
            _unitOfWork = unitOfWork;
        }
        [Loggable]
        public async Task<Tax> CreateAsync(CreateTaxRequest request)
        {
            var tax = request.ToTax();
            return await _taxRepository.CreateAsync(tax);
        }
        [Loggable]
        public List<Tax> GetAll()
        {
            return _taxRepository.GetTaxes();
        }
        [Loggable]
        public async Task DeleteAsync(long id)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var tax = await _taxRepository.GetByIdAsync(id) ?? throw new NotFoundException();

                _taxRepository.DeleteById(tax.Id);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }

        [Loggable]
        public async Task<Tax> UpdateAsync(UpdateTaxRequest updateTaxRequest)
        {
            try
            {
                var tax = updateTaxRequest.ToTax();
                if (!await _taxRepository.TaxExistsAsync(tax.Id))
                    throw new NotFoundException("Tax not found");
                return await _taxRepository.UpdateAsync(tax);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new ConflictException("Tax was modified in another session.");
            }
        }
    }
}
