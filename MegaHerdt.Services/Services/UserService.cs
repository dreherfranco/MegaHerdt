using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class UserService
    {
        private readonly AuthHelper AuthHelper;
        public UserService(AuthHelper authHelper)
        {
            this.AuthHelper = authHelper;
        }

        public  IEnumerable<User> Get()
        {
            return AuthHelper.Get();
        }
        public User GetByEmail(string email)
        {
            Expression<Func<User, bool>> filter = x => x.Email == email;
            var user = AuthHelper.Get(filter).FirstOrDefault();
            if(user != null) { return user; }
            throw new Exception("User doesn't exists");
        }

        public async Task<UserToken> CreateUser(User user, string jwtKey)
        {
            return await AuthHelper.CreateUser(user, jwtKey);
        }

        public async Task<UserToken> Login(User user, string jwtKey)
        {
            return await AuthHelper.Login(user, jwtKey);
        }

        public async Task<UserToken> UserUpdate(User user, string jwtKey)
        {
            return await AuthHelper.UserUpdate(user, jwtKey);
        }
        public async Task<UserToken> ChangePassword(string userEmail, string currentPassword, string newPassword, string jwtKey)
        {
            return await this.AuthHelper.ChangePassword(userEmail, currentPassword, newPassword, jwtKey);
        }

        public async Task UserDelete(string userEmail)
        {
            await AuthHelper.UserDelete(userEmail);
        }

        public async Task<List<string>> GetUserRoles(string userEmail)
        {
            return await this.AuthHelper.GetUserRoles(userEmail);
        }
       
    }
}
