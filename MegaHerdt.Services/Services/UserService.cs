using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.Identity;

namespace MegaHerdt.Services.Services
{
    public class UserService
    {
        private readonly AuthHelper AuthHelper;
        public UserService(AuthHelper authHelper)
        {
            this.AuthHelper = authHelper;
        }

        public  IQueryable<User> Get()
        {
            return AuthHelper.Get();
        }

        public async Task<UserToken> CreateUser(User user, string jwtKey)
        {
            return await AuthHelper.CreateUser(user, jwtKey);
        }

        public async Task<UserToken> Login(User user, string jwtKey)
        {
            return await AuthHelper.Login(user, jwtKey);
        }

        public async Task<List<string>> GetRoles()
        {
            return await this.AuthHelper.GetRoles();
        }
        public async Task<bool> AssignRole(string roleName, string userId)
        { 
            return await this.AuthHelper.AssignRole(roleName, userId);
        }
        public async Task<bool> RemoveRole(string roleName, string userId)
        { 
            return await this.AuthHelper.RemoveRole(roleName, userId);
        }

    }
}
