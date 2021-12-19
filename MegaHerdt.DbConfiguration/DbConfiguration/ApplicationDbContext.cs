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
       public DbSet<Phone> Phones { get; set; }
       public DbSet<Address> Addresses { get; set; }
       public DbSet<Reparation> Reparations { get; set; }
       public DbSet<ReparationState> ReparationsStates { get; set;}

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
           .HasIndex(u => u.Email)
           .IsUnique();

            modelBuilder.Entity<Reparation>()
                   .HasOne(r => r.Client)
                   .WithMany(u => u.ClientReparations)
                   .HasForeignKey(r => r.ClientId);

            modelBuilder.Entity<Reparation>()
                   .HasOne(r => r.Employee)
                   .WithMany(u => u.EmployeeReparations)
                   .HasForeignKey(r => r.EmployeeId);

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

            var reparationState = new ReparationState()
            {
                Id = 1,
                Name = "En proceso"
            };

            modelBuilder.Entity<IdentityRole>()
                .HasData(new List<IdentityRole>(){ rolAdmin,rolAdmin2});

            modelBuilder.Entity<ReparationState>()
                .HasData(reparationState);
        }
    }
}
