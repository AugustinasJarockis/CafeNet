using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Business_Management.Interceptors;
using CafeNet.Business_Management.Interfaces;
using CafeNet.Business_Management.Validators;
using CafeNet.Data.Database;
using CafeNet.Data.Enums;
using CafeNet.Data.Mappers;
using CafeNet.Data.Models;
using CafeNet.Data.Repositories;
using CafeNet.Infrastructure.Pagination;
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
    [Loggable]
    public async Task<User> CreateAsync(User user)
    {
        await ValidateUserSignUpConflicts(user);

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

    [Loggable]
    public async Task DeleteAsync(long id)
    {
        var user = await _userRepository.GetByIdAsync(id) ?? throw new NotFoundException();
        _userRepository.DeleteById(user.Id);
    }

    [Loggable]
    public async Task<User> GetByIdAsync(long id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        return user ?? throw new NotFoundException();
    }

    [Loggable]
    public async Task<IEnumerable<User>> GetEmployeesByLocation(long id)
    {
        var employeeRoles = new[] { UserRoles.BARISTA, UserRoles.ADMIN };

        return await _userRepository.GetEmployeesByLocationIdAsync(employeeRoles, id);
    }

    [Loggable]
    public async Task<User> GetByUsernameAsync(string username)
    {
        var user = await _userRepository.GetByUsernameAsync(username);

        return user ?? throw new NotFoundException();
    }

    [Loggable]
    public async Task<PagedResult<UserDTO>> GetEmployeesAsync(int pageNumber, int pageSize)
    {
        var employeeRoles = new[] { UserRoles.BARISTA, UserRoles.ADMIN };

        var totalCount = await _userRepository.CountByRolesAsync(employeeRoles);
        var users = await _userRepository.GetByRolesPagedAsync(employeeRoles, pageNumber, pageSize);

        var items = users.Select(UserMapper.ToUserDTO).ToList();

        return new PagedResult<UserDTO>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    [Loggable]
    public async Task<User> PatchOwnProfileAsync(long id, PatchOwnProfileRequest patchOwnProfileRequest)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(id)
                ?? throw new NotFoundException("User not found");

            UserValidator.ValidateUpdateUserRequest(patchOwnProfileRequest);
            user.ToUser(patchOwnProfileRequest);
            return await _userRepository.UpdateAsync(user);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConflictException("User was modified in another session.");
        }
    }

    [Loggable]
    public async Task<User> AdminPatchUserAsync(long targetUserId, long currentUserId, PatchUserRequest patchUserRequest)
    {
        try
        {
            UserValidator.ValidateUpdateUserRequest(patchUserRequest);

            var targetUser = await _userRepository.GetByIdAsync(targetUserId)
                ?? throw new NotFoundException("User not found.");

            if (targetUser.Role == UserRoles.ADMIN && targetUser.Id != currentUserId)
                throw new ForbiddenException("You are not allowed to update other admins.");

            if (targetUser.Role == UserRoles.CLIENT)
                throw new ForbiddenException("You are not allowed to update client information.");

            targetUser.ToUser(patchUserRequest);
            return await _userRepository.UpdateAsync(targetUser);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConflictException("User was modified in another session.");
        }
    }

    [Loggable]
    private async Task ValidateUserSignUpConflicts(User createUserRequest)
    {

        if (await IsUsernameUsed(createUserRequest.Username))
        {
            throw new ConflictException("This username is already in use.");
        }
    }

    [Loggable]
    private async Task<bool> IsUsernameUsed(string username)
    {
        return await _userRepository.UsernameExistsAsync(username);
    }

    [Loggable]
    public async Task<Location> GetUserLocationAddressAsync(long id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user?.Location == null)
            throw new NotFoundException("User location not found");

        return user.Location;
    }

}