using CafeNet.Data.Enums;
using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IUserRepository
    {
        public void Add(User user);
        public void DeleteById(long id);
        public Task<User> GetByIdAsync(long id);
        public Task<User> GetByUsernameAsync(string username);
        public Task<User> UpdateAsync(User user);
        public Task<IEnumerable<User>> GetByRolesPagedAsync(IEnumerable<UserRoles> roles, int pageNumber, int pageSize);
        public Task<int> CountByRolesAsync(IEnumerable<UserRoles> roles);
        public Task<bool> UsernameExistsAsync(string username);
        public Task<IEnumerable<User>> GetEmployeesByLocationIdAsync(IEnumerable<UserRoles> roles, long locationId);
        public Task<IEnumerable<User>> GetByLocationIdAndRolesAsync(IEnumerable<UserRoles> roles, long locationId);
    }
}
