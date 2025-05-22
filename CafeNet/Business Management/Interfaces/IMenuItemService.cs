using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Interfaces
{
    public interface IMenuItemService
    {
        Task<MenuItem> CreateAsync(CreateMenuItemRequest request);
    }
}
