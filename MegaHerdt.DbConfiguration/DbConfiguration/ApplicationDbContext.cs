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
       public DbSet<ReparationClaim> ReparationsClaims { get; set;}
       public DbSet<ReparationArticle> ReparationsArticles { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
       public DbSet<Article> Articles { get; set; }
       public DbSet<ArticleBrand> ArticlesBrands { get; set; }
       public DbSet<ArticleCategory> ArticlesCategories { get; set; }
        public DbSet<ArticleOffer> ArticlesOffers { get; set; }
        public DbSet<Provider> Providers { get; set; }
        public DbSet<ArticleProvider> ArticlesProviders { get; set; }
        public DbSet<ArticleProviderSerialNumber> ArticlesProviderSerialNumbers { get; set; }
        public DbSet<Purchase> Purchases { get; set;}
        public DbSet<PurchaseClaim> PurchasesClaims { get; set; }
        public DbSet<PurchaseArticle> PurchasesArticles { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<TransportCompany> TransportCompanies { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                       .HasIndex(u => u.Dni)
                       .IsUnique();
           
            modelBuilder.Entity<User>()
                       .Property(u => u.Dni)
                       .IsRequired(false);

            modelBuilder.Entity<Article>()
           .HasIndex(u => u.Code)
           .IsUnique();

            modelBuilder.Entity<Article>()
                .Ignore(x => x.UnitValueWithOffer);

            modelBuilder.Entity<Reparation>()
                   .HasOne(r => r.Client)
                   .WithMany(u => u.ClientReparations)
                   .HasForeignKey(r => r.ClientId);

            modelBuilder.Entity<Reparation>()
                   .HasOne(r => r.Employee)
                   .WithMany(u => u.EmployeeReparations)
                   .HasForeignKey(r => r.EmployeeId);

            modelBuilder.Entity<Reparation>()
                .HasOne(x => x.Bill)
                .WithOne(x => x.Reparation)
                .HasForeignKey<Bill>(x => x.ReparationId);

            modelBuilder.Entity<ReparationArticle>()
                .HasKey(x => new { x.ArticleId, x.ReparationId });

            modelBuilder.Entity<Purchase>()
                .HasOne(x => x.Bill)
                .WithOne(x => x.Purchase)
                .HasForeignKey<Bill>(x => x.PurchaseId);
            
            modelBuilder.Entity<PurchaseArticle>()
                .HasKey(x => new { x.ArticleId, x.PurchaseId });


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
                Name = "ADMIN",
                NormalizedName = "ADMIN"
            };

            var rolAdmin2 = new IdentityRole()
            {
                Id = rolAdminId2,
                Name = "EMPLEADO",
                NormalizedName = "EMPLEADO"
            };

            var reparationState = new ReparationState()
            {
                Id = 1,
                Name = "INGRESO"
            };
            var reparationState2 = new ReparationState()
            {
                Id = 2,
                Name = "EN PRESUPUESTO"
            };
            var reparationState3 = new ReparationState()
            {
                Id = 3,
                Name = "EN REPARACION"
            };
            var reparationState4 = new ReparationState()
            {
                Id = 4,
                Name = "PREPARADO"
            };
            modelBuilder.Entity<IdentityRole>()
                .HasData(new List<IdentityRole>(){ rolAdmin,rolAdmin2});

            modelBuilder.Entity<ReparationState>()
                .HasData(new List<ReparationState>() { reparationState, reparationState2, reparationState3, reparationState4 });
        }
    }
}
