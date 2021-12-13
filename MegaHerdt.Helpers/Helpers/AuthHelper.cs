using Microsoft.AspNetCore.Identity;
using MegaHerdt.DbConfiguration.DbConfiguration;
using MegaHerdt.Models.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;

namespace MegaHerdt.Helpers.Helpers
{
    public class AuthHelper
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
       
        public AuthHelper(ApplicationDbContext context, UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
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
                return await BuildToken(user, jwtKey);
            }
            throw new Exception("Invalid login attempt.");
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
       public IEnumerable<User> Get()
        {
           /* var queryable = this.context.Users.AsQueryable().;
            queryable = queryable.OrderBy(x => x.Email);*/
            return this.context.Users.AsEnumerable() ;
        }

        public async Task<List<string>> GetRoles()
        {
            return await context.Roles.Select(x => x.Name).ToListAsync();
        }


        //VER EditRoleDTO
        public async Task<bool> AssignRole(string roleName, string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User doesn't exists");
            }

            var addClaim = await userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, roleName));
            if (addClaim.Succeeded)
                return true;
            return false;
        }

        //VER EditRoleDTO
        public async Task<bool> RemoveRole(string roleName, string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
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
