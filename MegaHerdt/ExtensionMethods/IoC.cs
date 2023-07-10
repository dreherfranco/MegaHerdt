using MegaHerdt.DbConfiguration.DbConfiguration;
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Repository.Base;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace MegaHerdt.API.ExtensionMethods
{
    public static class IoC
    {
        public static WebApplicationBuilder DbConfiguration(this WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ApplicationDbContext>(
                            options =>options.UseSqlServer(connectionString, b => b.MigrationsAssembly("MegaHerdt.API"))
                           //options => options.UseNpgsql(connectionString, b => b.MigrationsAssembly("MegaHerdt.API"))
                           );


            builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddUserManager<UserManager<User>>()
                .AddSignInManager()
                .AddDefaultTokenProviders();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
                            options.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuer = false,
                                ValidateAudience = false,
                                ValidateLifetime = true,
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(builder.Configuration["jwt:key"])),
                                ClockSkew = TimeSpan.Zero,
                            });

            builder.Services.Configure<IdentityOptions>(options =>
            {
                // Default Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 5;
                options.Password.RequiredUniqueChars = 1;
            });
            return builder;
        }

        public static WebApplicationBuilder SwaggerInjection(this WebApplicationBuilder builder)
        {
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIAutores", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[]{}
                    }
                });

            });
            return builder;
        }

        public static WebApplicationBuilder HelpersInjection(this WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<AuthHelper>();
            builder.Services.AddTransient<ReparationHelper>();
            builder.Services.AddTransient<ReparationClaimHelper>();
            builder.Services.AddTransient<ReparationStateHelper>();
            builder.Services.AddTransient<ReparationPaymentHelper>();
            builder.Services.AddTransient<ArticleBrandHelper>();
            builder.Services.AddTransient<ArticleCategoryHelper>();
            builder.Services.AddTransient<ArticleHelper>();
            builder.Services.AddTransient<ArticleOfferHelper>();
            builder.Services.AddTransient<ProviderHelper>();
            builder.Services.AddTransient<ArticleProviderHelper>();
            builder.Services.AddTransient<PurchaseHelper>();
            builder.Services.AddTransient<PurchaseClaimHelper>();
            builder.Services.AddTransient<PurchasePaymentHelper>();
            builder.Services.AddTransient<TransportCompanyHelper>();
            builder.Services.AddTransient<DebtorsHelper>();
            builder.Services.AddTransient<IncomeExpensesHelper>();
            return builder;
        }

        public static WebApplicationBuilder ServicesInjection(this WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<UserService>();
            builder.Services.AddTransient<RoleService>();
            builder.Services.AddTransient<HashService>();
            builder.Services.AddTransient<ReparationService>();
            builder.Services.AddTransient<ReparationPaymentService>();
            builder.Services.AddTransient<ReparationClaimService>();
            builder.Services.AddTransient<ReparationStateService>();
            builder.Services.AddTransient<ArticleBrandService>();
            builder.Services.AddTransient<ArticleCategoryService>();
            builder.Services.AddTransient<ArticleService>();
            builder.Services.AddTransient<ArticleOfferService>();
            builder.Services.AddTransient<ProviderService>();
            builder.Services.AddTransient<ArticleProviderService>();
            builder.Services.AddTransient<PurchaseService>();
            builder.Services.AddTransient<PurchaseClaimService>();
            builder.Services.AddTransient<PurchasePaymentService>();
            builder.Services.AddTransient<TransportCompanyService>();
            builder.Services.AddTransient<DebtorsService>();
            builder.Services.AddTransient<IncomeExpensesService>();
            return builder;
        }

        public static WebApplicationBuilder RepositoryInjection(this WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<Repository<User>>();
            builder.Services.AddTransient<Repository<IdentityRole>>();
            builder.Services.AddTransient<Repository<Reparation>>();
            builder.Services.AddTransient<Repository<Payment>>();
            builder.Services.AddTransient<Repository<ReparationClaim>>();
            builder.Services.AddTransient<Repository<ReparationState>>();
            builder.Services.AddTransient<Repository<ArticleBrand>>();
            builder.Services.AddTransient<Repository<ArticleCategory>>();
            builder.Services.AddTransient<Repository<Article>>();
            builder.Services.AddTransient<Repository<ArticleOffer>>();
            builder.Services.AddTransient<Repository<Provider>>();
            builder.Services.AddTransient<Repository<ArticleProvider>>();
            builder.Services.AddTransient<Repository<Bill>>();
            builder.Services.AddTransient<Repository<Purchase>>();
            builder.Services.AddTransient<Repository<PurchaseClaim>>();
            builder.Services.AddTransient<Repository<TransportCompany>>();
            return builder;
        }
    }
}
