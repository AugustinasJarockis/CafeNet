using CafeNet.Business_Management.DTOs;
using CafeNet.Business_Management.Exceptions;

namespace CafeNet.Business_Management.Validators
{
    public static class AuthValidator
    {
        public static void ValidateLoginRequest(LoginRequest loginRequest)
        {
            if (loginRequest == null)
                throw new BadRequestException();

            if (loginRequest.Username == null)
                throw new BadRequestException("Please provide username");

            if (loginRequest.Password == null)
                throw new BadRequestException("Please provide password");
        }
    }
}
