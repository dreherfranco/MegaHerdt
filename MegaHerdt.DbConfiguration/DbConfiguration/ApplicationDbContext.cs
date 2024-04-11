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
        public DbSet<ArticleProviderItem> ArticleProviderItems { get; set; }
        public DbSet<ArticleProviderSerialNumber> ArticlesProviderSerialNumbers { get; set; }
        public DbSet<Purchase> Purchases { get; set;}
        public DbSet<PurchaseClaim> PurchasesClaims { get; set; }
        public DbSet<PurchaseArticle> PurchasesArticles { get; set; }
        public DbSet<PurchaseArticleSerialNumber> PurchasesArticlesSerialNumbers { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<TransportCompany> TransportCompanies { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            #region User
            modelBuilder.Entity<User>()
                       .HasIndex(u => u.Dni)
                       .IsUnique();
           
            modelBuilder.Entity<User>()
                       .Property(u => u.Dni)
                       .IsRequired(false);
            #endregion

            #region Article
            modelBuilder.Entity<Article>()
           .HasIndex(u => u.Code)
           .IsUnique();

            modelBuilder.Entity<Article>()
                .Ignore(x => x.UnitValueWithOffer);
            #endregion

            #region Reparation
            modelBuilder.Entity<Reparation>()
                   .HasOne(r => r.Client)
                   .WithMany(u => u.ClientReparations)
                   .HasForeignKey(r => r.ClientId)
                   .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reparation>()
                   .HasOne(r => r.Employee)
                   .WithMany(u => u.EmployeeReparations)
                   .HasForeignKey(r => r.EmployeeId)
                   .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Reparation>()
                .HasOne(x => x.Bill)
                .WithOne(x => x.Reparation)
                .HasForeignKey<Bill>(x => x.ReparationId);
            #endregion

            #region ReparationArticle
            modelBuilder.Entity<ReparationArticle>()
                .HasKey(x => new { x.ArticleId, x.ReparationId });
            #endregion

            #region Purchase 
            modelBuilder.Entity<Purchase>()
                .HasOne(x => x.Bill)
                .WithOne(x => x.Purchase)
                .HasForeignKey<Bill>(x => x.PurchaseId);

            modelBuilder.Entity<Purchase>()
                .HasOne(p => p.Shipment)
                .WithOne(s => s.Purchase)
                .HasForeignKey<Shipment>(s => s.PurchaseId)
                .OnDelete(DeleteBehavior.Restrict);
            #endregion

            #region PurchaseClaim
            modelBuilder.Entity<PurchaseClaim>()
                .HasOne(p => p.Purchase)
                .WithMany(p => p.PurchasesClaims)
                .HasForeignKey(p => p.PurchaseId)
                .OnDelete(DeleteBehavior.Restrict);
            #endregion

            #region PurchaseArticle
            modelBuilder.Entity<PurchaseArticle>()
                .HasKey(x => new { x.ArticleId, x.PurchaseId });
            #endregion

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
                Name = "EN REVISION"
            };
            var reparationState3 = new ReparationState()
            {
                Id = 3,
                Name = "EN PRESUPUESTO"
            };
            var reparationState4 = new ReparationState()
            {
                Id = 4,
                Name = "EN REPARACION"
            };
            var reparationState5 = new ReparationState()
            {
                Id = 5,
                Name = "REPARADO"
            };
            var reparationState6 = new ReparationState()
            {
                Id = 6,
                Name = "PAGADO"
            };
            var reparationState7 = new ReparationState()
            {
                Id = 7,
                Name = "ENTREGADO"
            };
            var reparationState8 = new ReparationState()
            {
                Id = 8,
                Name = "CANCELADO"
            };
            modelBuilder.Entity<IdentityRole>()
                .HasData(new List<IdentityRole>(){ rolAdmin,rolAdmin2});

            modelBuilder.Entity<ReparationState>()
                .HasData(new List<ReparationState>() { 
                    reparationState, reparationState2, reparationState3, reparationState4, 
                    reparationState5, reparationState6, reparationState7, reparationState8,                
                });

            var user = new User() { Id = "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe", Dni="42464099", Password= "HbUx5+Ac8aaOfKLSxrpaTQ8uMV9Iz/ty5pBaJINg5Fc=", Name="Admin", Surname="Admin", Enabled=true, IsActive=true, CreatedDate= DateTime.UtcNow, UserName= "megaherdt.electronica@hotmail.com",NormalizedUserName= "MEGAHERDT.ELECTRONICA@HOTMAIL.COM", Email= "megaherdt.electronica@hotmail.com", NormalizedEmail= "MEGAHERDT.ELECTRONICA@HOTMAIL.COM", EmailConfirmed=false, PasswordHash= "AQAAAAEAACcQAAAAEMfyNTA180vxZ2Log08brPlw6oav6rL7mDtMn2Dv22mlg+eRjRRRtNMSCA4aoAvyNA==", LockoutEnabled=true, TwoFactorEnabled=false };
            var user2 = new User() { Id = "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe", Dni="45698746", Password= "HbUx5+Ac8aaOfKLSxrpaTQ8uMV9Iz/ty5pBaJINg5Fc=", Name="Tomi", Surname="Zappa", Enabled=true, IsActive=true, CreatedDate= DateTime.UtcNow, UserName= "conefecto77@gmail.com",NormalizedUserName= "CONEFECTO77@GMAIL.COM", Email= "conefecto77@gmail.com", NormalizedEmail= "CONEFECTO77@GMAIL.COM", EmailConfirmed=false, PasswordHash= "AQAAAAEAACcQAAAAEMfyNTA180vxZ2Log08brPlw6oav6rL7mDtMn2Dv22mlg+eRjRRRtNMSCA4aoAvyNA==", LockoutEnabled=true, TwoFactorEnabled=false };
            modelBuilder.Entity<User>()
               .HasData( user, user2 );

            modelBuilder.Entity<IdentityUserRole<string>>()
               .HasData( new IdentityUserRole<string>() { RoleId= "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d", UserId= "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe" } );

        }
    }
}
