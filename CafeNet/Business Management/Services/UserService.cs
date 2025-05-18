using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Validators;
using CafeNet.Data.Database;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CafeNet.Business_Management.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    // This method uses a transaction.
    // Transaction is not actually needed in this case. It's an example of how to use it.
    public async Task<User> CreateAsync(User user)
    {
        ValidateUserSignUpConflicts(user);

        await _unitOfWork.BeginTransactionAsync();
        try
        {
            _userRepository.Add(user);

            await _unitOfWork.SaveChangesAsync();
            await _unitOfWork.CommitTransactionAsync();

            return user;
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }
    }

    public async Task DeleteAsync(long id)
    {
        await _unitOfWork.BeginTransactionAsync();
        try
        {
            var user = await _userRepository.GetByIdAsync(id) ?? throw new NotFoundException();
            _userRepository.Delete(user);

            await _unitOfWork.SaveChangesAsync();
            await _unitOfWork.CommitTransactionAsync();
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }
    }

    public async Task<User> GetByIdAsync(long id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        return user ?? throw new NotFoundException();
    }

    public async Task<User> GetByUsernameAsync(string username)
    {
        var user = await _userRepository.GetByUsernameAsync(username);

        return user ?? throw new NotFoundException();
    }

    public async Task<User> UpdateAsync(User user)
    {
        try
        {
            return await _userRepository.UpdateAsync(user);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConflictException("User was modified by another process.");
        }
    }
    private void ValidateUserSignUpConflicts(User createUserRequest)
    {

        if (IsUsernameUsed(createUserRequest.Username))
        {
            throw new ConflictException("This username is already in use.");
        }
    }
    private bool IsUsernameUsed(string username)
    {
        return _userRepository.AnyUserUsernameDuplicate(username);
    }
}