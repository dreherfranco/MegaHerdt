﻿// <auto-generated />
using System;
using MegaHerdt.DbConfiguration.DbConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("MegaHerdt.Models.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Floor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("PostalCode")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("StreetName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("StreetNumber")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TownName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BrandId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Stock")
                        .HasColumnType("INTEGER");

                    b.Property<float>("UnitValue")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("Code")
                        .IsUnique();

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleBrand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ArticlesBrands");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ArticlesCategories");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleOffer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DiscountPercentage")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.ToTable("ArticlesOffers");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleProvider", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ArticleQuantity")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProviderId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ProvisionDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Voucher")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("ProviderId");

                    b.ToTable("ArticlesProviders");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Bill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Number")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PurchaseId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ReparationId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("PurchaseId")
                        .IsUnique();

                    b.HasIndex("ReparationId")
                        .IsUnique();

                    b.ToTable("Bills");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Identity.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Dni")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("Amount")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("PaymentMethodId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Tax")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PaymentMethodId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.PaymentMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ClientInterest")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Commission")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndValidity")
                        .HasColumnType("TEXT");

                    b.Property<int>("PayDays")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PriceType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Service")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartValidity")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tag")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("PaymentMethods");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Phone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Phones");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Provider", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Providers");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Purchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BillId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Purchases");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Reparation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Amount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("BillId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmployeeId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ReparationStateId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ReparationStateId");

                    b.ToTable("Reparations");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ReparationArticle", b =>
                {
                    b.Property<int>("ArticleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ReparationId")
                        .HasColumnType("INTEGER");

                    b.Property<float>("ArticlePriceAtTheMoment")
                        .HasColumnType("REAL");

                    b.Property<int>("ArticleQuantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("ArticleId", "ReparationId");

                    b.HasIndex("ReparationId");

                    b.ToTable("ReparationsArticles");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ReparationClaim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Answered")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ReparationId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("ReparationId");

                    b.ToTable("ReparationsClaims");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ReparationState", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ReparationsStates");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "En proceso"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                            ConcurrencyStamp = "1e4bfb38-0c5a-432d-bf1f-d21685f9664e",
                            Name = "ADMIN",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                            ConcurrencyStamp = "53abb925-ec59-4105-8e32-11447c1f7b5c",
                            Name = "EMPLEADO",
                            NormalizedName = "EMPLEADO"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Address", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", "User")
                        .WithMany("Addresses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Article", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.ArticleBrand", "Brand")
                        .WithMany("Articles")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.ArticleCategory", "Category")
                        .WithMany("Articles")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleOffer", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Article", "Article")
                        .WithMany("Offers")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleProvider", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Article", "Article")
                        .WithMany("ArticlesProviders")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.Provider", "Provider")
                        .WithMany("ArticlesProviders")
                        .HasForeignKey("ProviderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Provider");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Bill", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Purchase", "Purchase")
                        .WithOne("Bill")
                        .HasForeignKey("MegaHerdt.Models.Models.Bill", "PurchaseId");

                    b.HasOne("MegaHerdt.Models.Models.Reparation", "Reparation")
                        .WithOne("Bill")
                        .HasForeignKey("MegaHerdt.Models.Models.Bill", "ReparationId");

                    b.Navigation("Purchase");

                    b.Navigation("Reparation");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Payment", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.PaymentMethod", "PaymentMethod")
                        .WithMany("Payments")
                        .HasForeignKey("PaymentMethodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PaymentMethod");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Phone", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", "User")
                        .WithMany("Phones")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Reparation", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", "Client")
                        .WithMany("ClientReparations")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.Identity.User", "Employee")
                        .WithMany("EmployeeReparations")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.ReparationState", "ReparationState")
                        .WithMany("Reparations")
                        .HasForeignKey("ReparationStateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Employee");

                    b.Navigation("ReparationState");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ReparationArticle", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Article", "Article")
                        .WithMany("ReparationArticles")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.Reparation", "Reparation")
                        .WithMany("ReparationsArticles")
                        .HasForeignKey("ReparationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Reparation");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ReparationClaim", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", "Client")
                        .WithMany("ReparationsClaims")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.Reparation", "Reparation")
                        .WithMany("ReparationsClaims")
                        .HasForeignKey("ReparationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Reparation");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MegaHerdt.Models.Models.Identity.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("MegaHerdt.Models.Models.Identity.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Article", b =>
                {
                    b.Navigation("ArticlesProviders");

                    b.Navigation("Offers");

                    b.Navigation("ReparationArticles");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleBrand", b =>
                {
                    b.Navigation("Articles");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ArticleCategory", b =>
                {
                    b.Navigation("Articles");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Identity.User", b =>
                {
                    b.Navigation("Addresses");

                    b.Navigation("ClientReparations");

                    b.Navigation("EmployeeReparations");

                    b.Navigation("Phones");

                    b.Navigation("ReparationsClaims");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.PaymentMethod", b =>
                {
                    b.Navigation("Payments");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Provider", b =>
                {
                    b.Navigation("ArticlesProviders");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Purchase", b =>
                {
                    b.Navigation("Bill")
                        .IsRequired();
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.Reparation", b =>
                {
                    b.Navigation("Bill")
                        .IsRequired();

                    b.Navigation("ReparationsArticles");

                    b.Navigation("ReparationsClaims");
                });

            modelBuilder.Entity("MegaHerdt.Models.Models.ReparationState", b =>
                {
                    b.Navigation("Reparations");
                });
#pragma warning restore 612, 618
        }
    }
}
