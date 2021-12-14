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

namespace MegaHerdt.Helpers.Helpers
{
    public class AuthHelper
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public AuthHelper(ApplicationDbContext context, UserManager<User> userManager,
            SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }


        //PASAR EL jwtkey CON IConfiguration del jwt:key DESDE CONTROLADOR
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
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return await BuildToken(user, jwtKey);
            }
            throw new Exception("Update with errors");
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
            if (filter == null)
            {
                return this.context.Users
                    .AsQueryable()
                    .OrderBy(x => x.Email);
            }
            else
            {
                return this.context.Users
                    .AsQueryable()
                    .Where(filter)
                    .OrderBy(x => x.Email);
            }
            
        }

        public async Task<List<string>> GetRoles()
        {
            return await context.Roles.Select(x => x.Name).ToListAsync();
        }

        public async Task<IdentityResult> CreateRole(string roleName)
        {
            var role = new IdentityRole() { Name=roleName };
            return await roleManager.CreateAsync(role);
        }
        //VER EditRoleDTO
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

        //VER EditRoleDTO
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
