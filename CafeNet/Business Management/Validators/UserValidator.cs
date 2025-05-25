using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;

namespace CafeNet.Business_Management.Validators
{
    public static class UserValidator
    {
        public static void ValidateCreateUserRequest(RegisterUserRequest request)
        {
            if (request == null)
                throw new BadRequestException("Bad request");

            if (string.IsNullOrWhiteSpace(request.Name) || !request.Name.IsValidName())
                throw new BadRequestException("Name is not valid.");

            if (string.IsNullOrWhiteSpace(request.Username) || !request.Username.IsValidUsername())
                throw new BadRequestException("Username is not valid.");

            if (string.IsNullOrWhiteSpace(request.Password) || !request.Password.IsValidPassword())
                throw new BadRequestException("Password is not valid.");

            if ((request.PhoneNumber != null) && !request.PhoneNumber.IsValidPhone())
                throw new BadRequestException("Phone is not valid.");
        }

        public static void ValidateUpdateUserRequest(PatchUserRequest request)
        {
            if (request == null)
                throw new BadRequestException("Bad request");

            if (!string.IsNullOrWhiteSpace(request.Name) && !request.Name.IsValidName())
                throw new BadRequestException("Name is not valid.");

            if (!string.IsNullOrWhiteSpace(request.Username) && !request.Username.IsValidUsername())
                throw new BadRequestException("Username is not valid.");
        }

        public static void ValidateUpdateUserRequest(PatchOwnProfileRequest request)
        {
            if (request == null)
                throw new BadRequestException("Bad request");

            if (!string.IsNullOrWhiteSpace(request.Name) && !request.Name.IsValidName())
                throw new BadRequestException("Name is not valid.");

            if (!string.IsNullOrWhiteSpace(request.Username) && !request.Username.IsValidUsername())
                throw new BadRequestException("Username is not valid.");

            if (!string.IsNullOrWhiteSpace(request.Password) && !request.Password.IsValidPassword())
                throw new BadRequestException("Password is not valid.");

            if ((request.PhoneNumber != null) && !request.PhoneNumber.IsValidPhone())
                throw new BadRequestException("Phone is not valid.");
        }
    }
}
