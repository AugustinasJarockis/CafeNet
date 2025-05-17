using CafeNet.Data.Database;
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

        public async Task DeleteAsync(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
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
