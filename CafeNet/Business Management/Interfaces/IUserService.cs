using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Interfaces;

public interface IUserService
{
    Task<User> GetByIdAsync(long id);
    Task<User> GetByUsernameAsync(string username);
    Task<User> CreateAsync(User user);
    Task<User> UpdateAsync(User user);
    Task DeleteAsync(long id);
}