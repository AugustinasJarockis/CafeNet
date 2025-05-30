﻿using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface ITaxRepository
    {
        public Task<Tax> CreateAsync(Tax tax);
        public Task<bool> TaxExistsAsync(long id);
        public List<Tax> GetTaxes();
        public Task<Tax> GetByIdAsync(long id);
        public void DeleteById(long id);
        public Task<Tax> UpdateAsync(Tax tax);
    }
}
