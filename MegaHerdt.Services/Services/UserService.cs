using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
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

        public  async Task<IEnumerable<User>> GetEnabledsUsers(string jwtKey)
        {
            
            var users = AuthHelper.Get()
                .Where(x => x.Enabled);
            users = await this.UpdateActivesUsers(users, jwtKey);
            return users;
        }

        private async Task<IQueryable<User>> UpdateActivesUsers(IQueryable<User> users, string jwtKey)
        {
            foreach (var user in users)
            {
                if (IsActive(user))
                {
                    user.IsActive = true;
                    await this.AuthHelper.UserUpdate(user, jwtKey);
                }
                else
                {
                    user.IsActive = false;
                    await this.AuthHelper.UserUpdate(user, jwtKey);
                }
            }
            return users;
        }

        public IEnumerable<User> GetAll()
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

        public User GetByUsername(string username)
        {
            Expression<Func<User, bool>> filter = x => x.UserName == username;
            var user = AuthHelper.Get(filter).FirstOrDefault();
            if (user != null) { return user; }
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

        public async Task<UserToken> ChangeForgotPassword(string userEmail, string newPassword, string jwtKey)
        {
            return await this.AuthHelper.ChangeForgotPassword(userEmail, newPassword, jwtKey);
        }

        public MailRequest SendPasswordToMail(string email, string newPassword)
        {
            return new MailRequest()
            {
                ToEmail = email,
                Subject = "Cambio de contraseña",
                Body = "Su nueva contraseña es: " + newPassword
            };
        }


        public async Task UserDelete(string userName)
        {
            await AuthHelper.UserDelete(userName);
        }

        public async Task<List<string>> GetUserRoles(string username)
        {
            return await this.AuthHelper.GetUserRoles(username);
        }
        public async Task<List<string>> GetUserRolesByUsername(string username)
        {
            return await this.AuthHelper.GetUserRolesByUsername(username);
        }

        private bool IsActive(User user)
        {
            var differenceDate = DateTime.UtcNow.Subtract(user.LastLogin.Date);
            var twoMonthsInDays = 60;
            return differenceDate.Days < twoMonthsInDays;
        }
    }
}
