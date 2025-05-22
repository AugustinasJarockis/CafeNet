using CafeNet.Data.Database;
using CafeNet.Data.Enums;
using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CafeNetDbContext _context;
        public UserRepository(CafeNetDbContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
        }

        public void DeleteById(long id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        public async Task<User> GetByIdAsync(long id)
        {
            return await _context.Users
                .Include(u => u.Location)
                .Include(u => u.Credit)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.Location)
                .Include(u => u.Credit)
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetByRolesPagedAsync(IEnumerable<UserRoles> roles, int pageNumber, int pageSize)
        {
            return await _context.Users
                                .Include(u => u.Location)
                                .Where(u => roles.Contains(u.Role))
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetEmployeesByLocationIdAsync(IEnumerable<UserRoles> roles, long locationId)
        {
            return await _context.Users
                .Include(u => u.Location)
                .Where(u => u.LocationId == locationId && roles.Contains(u.Role))
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetByLocationIdAndRolesAsync(IEnumerable<UserRoles> roles, long locationId)
        {
            return await _context.Users
                .Include(u => u.Location)
                .Where(u => u.LocationId == locationId && roles.Contains(u.Role))
                .ToListAsync();
        }

        public async Task<int> CountByRolesAsync(IEnumerable<UserRoles> roles)
        {
            return await _context.Users.CountAsync(u => roles.Contains(u.Role));
        }

        public async Task<bool> UsernameExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public bool AnyUserUsernameDuplicate(string username)
        {
            return _context.Users
                .Any(u => u.Username == username);
        }
    }
}
