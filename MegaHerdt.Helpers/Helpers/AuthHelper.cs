﻿using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using MegaHerdt.Models.Models.Identity;
using System.Linq.Expressions;
using MegaHerdt.Repository.Base;
using MegaHerdt.Helpers.Handlers;
using MegaHerdt.Models.Models;

namespace MegaHerdt.Helpers.Helpers
{
    public class AuthHelper
    {
        private readonly Repository<User> userRepository;
        private readonly Repository<Purchase> purchaseRepository;
        private readonly Repository<IdentityRole> roleRepository;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthHelper(Repository<User> userRepository, Repository<IdentityRole> roleRepository, UserManager<User> userManager,
            SignInManager<User> signInManager, Repository<Purchase> purchaseRepository)
        {
            this.userRepository = userRepository;
            this.roleRepository = roleRepository;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.purchaseRepository = purchaseRepository;
        }

        public async Task<UserToken> CreateUser(User user, string jwtKey)
        {
            var errors = UserHandlerError.SetRegisterError(user, this.userRepository.Get().ToList());
            if(errors.Count > 0) {
                throw new Exception(errors[0]);
            }
            
            user.CreatedDate = DateTime.UtcNow;
            user.LastLogin = DateTime.UtcNow;
            var result = await this.userManager.CreateAsync(user, user.Password);

            if (result.Succeeded)
            {
                return await BuildToken(user, jwtKey);
            }
       
            throw new Exception("Register error");
        }

        public async Task<UserToken> Login(User user, string jwtKey)
        {
            var findUser = await this.userManager.FindByNameAsync(user.UserName);
            var result = await this.signInManager.PasswordSignInAsync(user.UserName, user.Password, isPersistent: false, lockoutOnFailure: false);
            
            if (findUser != null && findUser.Enabled && result.Succeeded)
            {    
                findUser.LastLogin = DateTime.UtcNow;
                findUser.IsActive = true;

                await this.userRepository.Update(findUser);

                return await BuildToken(findUser, jwtKey);
            }
            var strError = findUser is null ? "{NullUser}" : string.Empty;
            strError += !findUser.Enabled ? "{UserNotEnabled}" : string.Empty;
            strError += !result.Succeeded ? "{resultNotSucceeded}" : string.Empty;
            throw new Exception("Invalid login attempt." + strError);
        }

        public async Task<UserToken> UserUpdate(User user, string jwtKey)
        {
            var errors = UserHandlerError.SetUpdateError(user, this.userRepository.Get().ToList());
            if (errors.Count > 0)
            {
                throw new Exception(errors[0]);
            }

            var userDb = await userManager.FindByNameAsync(user.UserName);
            if (userDb != null)
            {
                user.Id = userDb.Id;
                await this.userRepository.Update(user);
                return await BuildToken(user, jwtKey);
            }
            throw new Exception("User doesn't exists");
        }

        public async Task<UserToken> ChangePassword(string username, string currentPassword,string newPassword, string jwtKey)
        {
            var userDb = await userManager.FindByNameAsync(username);
            if (userDb != null)
            {
                await this.userManager.ChangePasswordAsync(userDb, currentPassword, newPassword);
                return await BuildToken(userDb, jwtKey);
            }
            throw new Exception("User doesn't exists");
        }


        public async Task<UserToken> ChangeForgotPassword(string userEmail, string newPassword, string jwtKey)
        {
            var userDb = await userManager.FindByEmailAsync(userEmail);
            if (userDb != null)
            {
                var token = await this.userManager.GeneratePasswordResetTokenAsync(userDb);
                var result = await this.userManager.ResetPasswordAsync(userDb, token, newPassword);
                //var result = await this.userManager.ChangePasswordAsync(userDb, userDb.Password, newPassword);
                return await BuildToken(userDb, jwtKey);
            }
            throw new Exception("User doesn't exists");
        }

        public async Task UserDelete(string userName)
        {
            var userDb = await userManager.FindByNameAsync(userName);
            if (userDb != null)
            {
                userDb.Enabled = false;
                await this.userRepository.Update(userDb);
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
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim("name", user.UserName),
                    new Claim("surname", user.Surname),
                    new Claim(ClaimTypes.Sid, user.Id),
                    new Claim("id", user.Id),
                    new Claim("email", user.Email),
                    new Claim(ClaimTypes.Email, user.Email),
                };
               
           var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var identityUser = await this.userManager.FindByNameAsync(user.UserName);

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
                .OrderBy(x => x.UserName);
        }

        public async Task<List<string>> GetRoles()
        {
            return await roleRepository.Get().Select(x => x.Name).ToListAsync();
        }

        public async Task<List<string>> GetUserRoles(string username)
        {
            var user = await this.userManager.FindByNameAsync(username);
            var roles = await userManager.GetRolesAsync(user);
            return roles.ToList();
        }
      

        public async Task<string> CreateRole(string roleName)
        {
            var role = new IdentityRole() { Name=roleName };
            var roleCreated = await roleRepository.Add(role);
            return roleCreated.Name;
        }

        public async Task<bool> AssignRole(string roleName, string username)
        {
            var user = await userManager.FindByNameAsync(username);
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

        public async Task<bool> RemoveRoleToUser(string roleName, string username)
        {
            var user = await userManager.FindByNameAsync(username);
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


        #region Informes
        private async Task<List<User>> GetTopClientsByPurchases(DateTime? startDate, DateTime? endDate)
        {
            var purchasesInRange = await purchaseRepository.Get(p => p.Date >= startDate 
                                                            && p.Date <= endDate
                                                            && p.Client.Enabled)
                                                   .Include(p => p.Client) // Asegúrate de incluir los datos del cliente
                                                   .ToListAsync();

            // Agrupamos por cliente, contamos las compras y ordenamos de mayor a menor
            var topClients = purchasesInRange.GroupBy(p => p.Client)
                                             .Select(group => new
                                             {
                                                 Client = group.Key,
                                                 PurchasesCount = group.Count()
                                             })
                                             .OrderByDescending(c => c.PurchasesCount)
                                             .ToList();

            List<User> users = new();
            foreach(var group in topClients)
            {
                group.Client.PurchasesCount = group.PurchasesCount;
                users.Add(group.Client);
            }

            return users;
        }


        private async Task<List<User>> GetTopUsersByReparations(DateTime? startDate, DateTime? endDate)
        {
            // Obtener todas las reparaciones que caen dentro del rango de fechas y cuyos clientes están habilitados
            var reparationsInRange = await userRepository.Get(u => u.Enabled)
                .Include(u => u.ClientReparations)
                .Where(u => u.ClientReparations.Any(r => r.Date >= startDate && r.Date <= endDate))
                .ToListAsync();

            // Agrupamos por usuario y contamos las reparaciones como cliente y empleado
            var topUsers = reparationsInRange.Select(u => new
            {
                User = u,
                ReparationsCount = u.ClientReparations.Count(r => r.Date >= startDate && r.Date <= endDate) 
            })
            .OrderByDescending(u => u.ReparationsCount)
            .ToList();

            List<User> users = new();
            foreach (var group in topUsers)
            {
                group.User.ReparationsCount = group.ReparationsCount; // Usarás este campo para las reparaciones
                users.Add(group.User);
            }

            return users;
        }

        public async Task<List<User>> GetUsersWithPurchasesAndReparations(DateTime? startDate, DateTime? endDate)
        {
            var userPurchases = await GetTopClientsByPurchases(startDate, endDate);
            var userReparations = await GetTopUsersByReparations(startDate, endDate);

            var combinedList = userPurchases.Concat(userReparations).GroupBy(i => i.Id);

            List<User> users = new();

            foreach(var group in combinedList)
            {
                User? newUser = null;
                foreach(var user in group)
                {
                    if (newUser is null) 
                    {
                        newUser = user; 
                    }
                    else
                    {
                        newUser.PurchasesCount = newUser.PurchasesCount != 0 
                            ? newUser.PurchasesCount 
                            : user.PurchasesCount;
                        newUser.ReparationsCount = newUser.ReparationsCount != 0 
                            ? newUser.ReparationsCount 
                            : user.ReparationsCount;
                    }
                }

                users.Add(newUser!);
            }

            return users;
        }
        #endregion
    }
}
