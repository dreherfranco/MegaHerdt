

using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.Identity;

namespace MegaHerdt.Services.Services
{
    public class RoleService
    {
        private readonly AuthHelper AuthHelper;
        public RoleService(AuthHelper authHelper)
        {
            this.AuthHelper = authHelper;
        }

        public async Task<List<string>> GetRoles()
        {
            return await this.AuthHelper.GetRoles();
        }

        public async Task<string> CreateRole(string roleName)
        {
            return await this.AuthHelper.CreateRole(roleName);
        }
        public async Task<bool> AssignRole(string roleName, string username)
        {
            return await this.AuthHelper.AssignRole(roleName, username);
        }

        public async Task<bool> RemoveRoleToUser(string roleName, string username)
        {
            return await this.AuthHelper.RemoveRoleToUser(roleName, username);
        }

        public async Task DeleteRole(string roleName)
        {
            await this.AuthHelper.DeleteRole(roleName);
        }
        public async Task<List<string>> GetUserRoles(string username)
        {
            return await this.AuthHelper.GetUserRoles(username);
        }
    }
}
