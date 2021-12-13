using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;

namespace MegaHerdt.Services.Services
{
    public class UserService
    {
        private readonly AuthHelper AuthHelper;
        public UserService(AuthHelper authHelper)
        {
            this.AuthHelper = authHelper;
        }
        public async Task<UserToken> CreateUser(User user, string jwtKey)
        {
            return await AuthHelper.CreateUser(user, jwtKey);
        }
    }
}
