using System.Security.Claims;

namespace CafeNet.Infrastructure.Extensions;

public static class HttpContextExtensions
{
    public static long GetUserId(this HttpContext context)
    {
        var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);

        return userIdClaim != null ? long.Parse(userIdClaim.Value) : throw new UnauthorizedAccessException();
    }

    public static string GetUserRole(this HttpContext context)
    {
        var roleClaim = context.User.FindFirst(ClaimTypes.Role);
        return roleClaim?.Value ?? throw new UnauthorizedAccessException("User role claim is missing.");
    }
}
