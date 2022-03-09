using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using MegaHerdt.Models.Models.Identity;
using System.Linq.Expressions;
using MegaHerdt.Repository.Base;

namespace MegaHerdt.Helpers.Helpers
{
    public class AuthHelper
    {
        private readonly Repository<User> userRepository;
        private readonly Repository<IdentityRole> roleRepository;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthHelper(Repository<User> userRepository, Repository<IdentityRole> roleRepository, UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            this.userRepository = userRepository;
            this.roleRepository = roleRepository;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<UserToken> CreateUser(User user, string jwtKey)
        {
            var result = await this.userManager.CreateAsync(user, user.Password);

            if (result.Succeeded)
            {
                return await BuildToken(user, jwtKey);
            }

            throw new Exception("Create User error");

        }

        public async Task<UserToken> Login(User user, string jwtKey)
        {
            var result = await this.signInManager.PasswordSignInAsync(user.Email, user.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var findUser = await this.userManager.FindByEmailAsync(user.Email);
                return await BuildToken(findUser, jwtKey);
            }
            throw new Exception("Invalid login attempt.");
        }

        public async Task<UserToken> UserUpdate(User user, string jwtKey)
        {
            var userDb = await userManager.FindByEmailAsync(user.Email);
            if (userDb != null)
            {
                user.Id = userDb.Id;
                await this.userRepository.Update(user);
                return await BuildToken(user, jwtKey);
            }
            throw new Exception("User doesn't exists");
        }

        public async Task<UserToken> ChangePassword(string userEmail, string currentPassword,string newPassword, string jwtKey)
        {
            var userDb = await userManager.FindByEmailAsync(userEmail);
            if (userDb != null)
            {
                await this.userManager.ChangePasswordAsync(userDb, currentPassword, newPassword);
                return await BuildToken(userDb, jwtKey);
            }
            throw new Exception("User doesn't exists");
        }

        public async Task UserDelete(string userEmail)
        {
            var userDb = await userManager.FindByEmailAsync(userEmail);
            if (userDb != null)
            {
                await this.userRepository.Delete(userDb);
            }
        }

        public async Task<UserToken> RenovateToken(User user, string jwtKey)
        {
            return await BuildToken(user,jwtKey);
        }

        private async Task<UserToken> BuildToken(User user, string jwtKey)
        {
            var claims = new List<Claim>
            {
                new Claim("name", user.Name),
                new Claim("email", user.Email),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("surname", user.Surname),
                new Claim(ClaimTypes.Sid, user.Id),
                new Claim("id", user.Id),
            };
            
           var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var identityUser = await this.userManager.FindByEmailAsync(user.Email);

            var claimsDb = await this.userManager.GetClaimsAsync(identityUser);

            claims.AddRange(claimsDb);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds
               );

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

       public IQueryable<User> Get(Expression<Func<User, bool>> filter = null)
        {
            return this.userRepository.Get(filter)
                .Include(x => x.Phones)
                .Include(x => x.Addresses)
                .OrderBy(x => x.Email);
        }

        public async Task<List<string>> GetRoles()
        {
            return await roleRepository.Get().Select(x => x.Name).ToListAsync();
        }

        public async Task<List<string>> GetUserRoles(string userEmail)
        {
            var user = await this.userManager.FindByEmailAsync(userEmail);
            var roles = await userManager.GetRolesAsync(user);
            return roles.ToList();
        }

        public async Task<string> CreateRole(string roleName)
        {
            var role = new IdentityRole() { Name=roleName };
            var roleCreated = await roleRepository.Add(role);
            return roleCreated.Name;
        }

        public async Task<bool> AssignRole(string roleName, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            var role = roleRepository.Get(x => x.Name == roleName).FirstOrDefault();
            if (user == null || role == null)
            {
                throw new Exception("User or role doesn't exists");
            }
            
            var addClaim = await userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, roleName));
            await userManager.AddToRoleAsync(user, roleName);
            if (addClaim.Succeeded)
                return true;
            return false;
        }

        public async Task<bool> RemoveRoleToUser(string roleName, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            var role = roleRepository.Get(x => x.Name == roleName).FirstOrDefault();
            if (user == null || role==null)
            {
                throw new Exception("User or role don't exist");
            }
         
            var removeClaim = await userManager.RemoveClaimAsync(user, new Claim(ClaimTypes.Role, roleName));
            await userManager.RemoveFromRoleAsync(user, roleName);
            if (removeClaim.Succeeded)
                return true;
            return false;
        }

        public async Task DeleteRole(string roleName)
        {
            var role = roleRepository.Get(x => x.Name == roleName).FirstOrDefault();
            if (role == null)
            {
                throw new Exception("role don't exist");
            }

            await roleRepository.Delete(role) ;
        }
    }
}
