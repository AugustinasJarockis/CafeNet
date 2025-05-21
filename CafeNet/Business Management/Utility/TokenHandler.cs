using CafeNet.Business_Management.Exceptions;
using System.IdentityModel.Tokens.Jwt;

namespace CafeNet.Business_Management.Utility;
public static class TokenHandler
{
    private static string? GetClaimValue(this JwtSecurityToken token, string claimType) {
        return token.Claims.FirstOrDefault(c => c.Type == claimType)?.Value;
    }
    private static JwtSecurityToken GetJwtToken(string? authorizationString) {
        if (string.IsNullOrEmpty(authorizationString))
            throw new BadRequestException("Authorization token must be provided");

        string token;
        try {
            token = authorizationString.Split(' ')[1];
        }
        catch (IndexOutOfRangeException) {
            throw new BadRequestException("Invalid authorization token format. Expected 'Bearer <token>'");
        }

        var jwtHandler = new JwtSecurityTokenHandler();
        if (!jwtHandler.CanReadToken(token))
            throw new BadRequestException("Invalid token format");

        return jwtHandler.ReadJwtToken(token);
    }
    private static long GetUserId(JwtSecurityToken token) {
        var userIdString = token.GetClaimValue("nameid");
        return long.TryParse(userIdString, out var userId)
            ? userId
            : throw new BadRequestException("Invalid user ID in token");
    }

    public static long GetUserId(string? tokenString) => GetUserId(GetJwtToken(tokenString));
}
