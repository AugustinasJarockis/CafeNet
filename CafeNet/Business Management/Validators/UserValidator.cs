using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;
using CafeNet.Data.Models;

namespace CafeNet.Business_Management.Validators
{
    public static class UserValidator
    {
        public static void ValidateCreateUserRequest(RegisterUserRequest createUserRequest)
        {
            if (createUserRequest == null)
                throw new BadRequestException("Bad request");

            if (!createUserRequest.Name.IsValidName())
                throw new BadRequestException("Name is not valid.");

            if (!createUserRequest.Username.IsValidUsername())
                throw new BadRequestException("Username is not valid.");

            if (!createUserRequest.Password.IsValidPassword())
                throw new BadRequestException("Password is not valid.");
        }
    }
}
