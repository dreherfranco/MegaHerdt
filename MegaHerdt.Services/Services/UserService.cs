﻿using MegaHerdt.Helpers.Helpers;
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

        public  IQueryable<User> Get()
        {
            return AuthHelper.Get();
        }
        public IQueryable<User> GetByEmail(string email)
        {
            Expression<Func<User, bool>> filter = x => x.Email == email;
            return AuthHelper.Get(filter);
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
        public async Task<List<string>> GetRoles()
        {
            return await this.AuthHelper.GetRoles();
        }
        public async Task<IdentityResult> CreateRole(string roleName)
        {
            return await this.AuthHelper.CreateRole(roleName);
        }

        public async Task<bool> AssignRole(string roleName, string email)
        { 
            return await this.AuthHelper.AssignRole(roleName, email);
        }
        public async Task<bool> RemoveRole(string roleName, string email)
        { 
            return await this.AuthHelper.RemoveRole(roleName, email);
        }

    }
}
