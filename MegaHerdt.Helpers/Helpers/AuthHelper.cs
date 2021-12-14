using Microsoft.AspNetCore.Identity;
using MegaHerdt.DbConfiguration.DbConfiguration;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
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
        private readonly RoleManager<IdentityRole> roleManager;

        public AuthHelper(Repository<User> userRepository, Repository<IdentityRole> roleRepository, UserManager<User> userManager,
            SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.userRepository = userRepository;
            this.roleRepository = roleRepository;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
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
                this.userRepository.Update(user);
                return await BuildToken(user, jwtKey);
              //  throw new Exception("Update with errors");
            }
            throw new Exception("User doesn't exists");
        }

        public async Task<UserToken> RenovateToken(User user, string jwtKey)
        {
            return await BuildToken(user,jwtKey);
        }

        private async Task<UserToken> BuildToken(User user, string jwtKey)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Surname, user.Surname)
            };

            var identityUser = await this.userManager.FindByEmailAsync(user.Email);
            
            claims.Add(new Claim(ClaimTypes.NameIdentifier, identityUser.Id));

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

        //Hacer el paginado en el controlador con el QUERYABLE
       public IQueryable<User> Get(Expression<Func<User, bool>> filter = null)
        {
            return this.userRepository.Get(filter)
                .Include(x => x.Phones)
                .OrderBy(x => x.Email);
        }

        public async Task<List<string>> GetRoles()
        {
            return await roleRepository.Get().Select(x => x.Name).ToListAsync();
        }

        public async Task<IdentityResult> CreateRole(string roleName)
        {
            var role = new IdentityRole() { Name=roleName };
            return await roleManager.CreateAsync(role);
        }

        public async Task<bool> AssignRole(string roleName, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            var role = await roleManager.FindByNameAsync(roleName);
            if (user == null || role == null)
            {
                throw new Exception("User or role doesn't exists");
            }
            var addClaim = await userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, roleName));
            if (addClaim.Succeeded)
                return true;
            return false;
        }

        public async Task<bool> RemoveRole(string roleName, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new Exception("User doesn't exists");
            }

            var removeClaim = await userManager.RemoveClaimAsync(user, new Claim(ClaimTypes.Role, roleName));
            if (removeClaim.Succeeded)
                return true;
            return false;
        }
       
    }
}
