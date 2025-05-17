using CafeNet.Data.Models;

namespace CafeNet.Data.Repositories
{
    public interface IUserRepository
    {
        public void Add(User user);
        public void Delete(User user);
        public Task<User> GetByIdAsync(long id);
        public Task<User> GetByUsernameAsync(string username);
        public Task<User> UpdateAsync(User user);
        public Task<bool> UsernameExistsAsync(string username);
        public bool AnyUserUsernameDuplicate(string username);
    }
}
