using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces;

public interface IUserService
{
    Task<User> GetByIdAsync(long id);
    Task<User> GetByUsernameAsync(string username);
    Task<PagedResult<User>> GetEmployeesAsync(int pageNumber, int pageSize);
    Task<User> CreateAsync(User user);
    Task<User> UpdateAsync(User user);
    Task DeleteAsync(long id);
}