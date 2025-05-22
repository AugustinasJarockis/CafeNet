using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;
using CafeNet.Infrastructure.Pagination;

namespace CafeNet.Business_Management.Interfaces;

public interface IUserService
{
    Task<User> GetByIdAsync(long id);
    Task<User> GetByUsernameAsync(string username);
    Task<PagedResult<UserDto>> GetEmployeesAsync(int pageNumber, int pageSize);
    Task<User> CreateAsync(User user);
    Task<User> PatchOwnProfileAsync(long id, PatchOwnProfileRequest patchOwnProfileRequest);
    Task<User> AdminPatchUserAsync(long targetUserId, long currentUserId, PatchUserRequest patchUserRequest);
    Task DeleteAsync(long id);
}