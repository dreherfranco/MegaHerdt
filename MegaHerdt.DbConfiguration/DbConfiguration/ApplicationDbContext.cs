using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace MegaHerdt.DbConfiguration.DbConfiguration
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
       
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SeedData(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            var rolAdminId = "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d";
            var rolAdminId2 = "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e";

            var rolAdmin = new IdentityRole()
            {
                Id = rolAdminId,
                Name = "Admin",
                NormalizedName = "Admin"
            };

            var rolAdmin2 = new IdentityRole()
            {
                Id = rolAdminId2,
                Name = "Empleado",
                NormalizedName = "Empleado"
            };
            //var passwordHasher = new PasswordHasher<IdentityUser>();    

            modelBuilder.Entity<IdentityRole>()
                .HasData(new List<IdentityRole>(){ rolAdmin,rolAdmin2});

            
        }
    }
}
