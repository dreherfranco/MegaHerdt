using System.Security.Claims;

namespace MegaHerdt.API.Utils
{
    public static class UserValidations
    {
        public static bool UserEmailIsOk(string userEmail, HttpContext httpContext)
        {
            var userEmailClaim = httpContext.User.FindFirst(ClaimTypes.Email).Value;
            return userEmailClaim == userEmail;
        }
    }
}
