using MegaHerdt.API.DTOs.Backup;
using MegaHerdt.DbConfiguration.DbConfiguration;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.IO.Compression;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackupsController : ControllerBase
    {
        private readonly string containerBackup = "backup";
        private readonly string containerArticles = "articles";
        private readonly string containerArticlesProviders = "articles-providers";
        private readonly ArticleService articleService;
        private readonly ArticleProviderService articleProviderService;
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IConfiguration _configuration;
        public BackupsController(IWebHostEnvironment env, ArticleService articleService,
            ArticleProviderService articleProviderService, IHttpContextAccessor httpContextAccessor, 
            IConfiguration _configuration)
        {
            this.articleService = articleService;
            this.env = env;
            this.articleProviderService = articleProviderService;
            this.httpContextAccessor = httpContextAccessor;
            this._configuration = _configuration;
        }

        [HttpGet]
        public async Task<ActionResult<URLsZipDTO>> Backup()
        {
            try
            {
                if (string.IsNullOrWhiteSpace(env.WebRootPath))
                {
                    env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                }

                await BackupArticlesImages();
                await BackupArticlesProvidersVouchers();
                await BackupDatabase();

                var actualUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
                var urlArticlesZip = Path.Combine(actualUrl, Path.Combine(this.containerBackup, "articles.zip")).Replace("\\", "/");
                var urlArticlesProvidersZip = Path.Combine(actualUrl, Path.Combine(this.containerBackup, "articles-providers.zip")).Replace("\\", "/");
                var urlDatabaseZip = Path.Combine(actualUrl, Path.Combine(this.containerBackup, "database.zip")).Replace("\\", "/");

                var urlsDTO = new URLsZipDTO()
                {
                    UrlArticlesZip = urlArticlesZip,
                    UrlArticlesProvidersZip = urlArticlesProvidersZip,
                    UrlDatabaseZip = urlDatabaseZip
                };

                return urlsDTO;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private async Task BackupArticlesImages()
        {
            var articlesDb = this.articleService.GetAll();
            string folder = Path.Combine(env.WebRootPath, containerBackup, containerArticles);

            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, true);
                Directory.CreateDirectory(folder);
            }
            else
            {
                Directory.CreateDirectory(folder);
            }

            foreach (var article in articlesDb)
            {
                var articleImageName = article.Image.Split("/").LastOrDefault();
                var articlePath = Path.Combine(env.WebRootPath, containerArticles, articleImageName);
                var articleBackupPath = Path.Combine(folder, articleImageName);

                // Comprueba si existe el archivo en la carpeta de articulos.
                if (System.IO.File.Exists(articlePath))
                {
                    if (!System.IO.File.Exists(articleBackupPath))
                    {
                        System.IO.File.Copy(articlePath, articleBackupPath);
                    }
                }

            }

            var pathZip = Path.Combine(env.WebRootPath, containerBackup, "articles.zip");
            if (System.IO.File.Exists(pathZip))
            {
                System.IO.File.Delete(pathZip);
                ZipFile.CreateFromDirectory(folder, pathZip);
            }
            else
            {
                ZipFile.CreateFromDirectory(folder, pathZip);
            }

        }

        private async Task BackupArticlesProvidersVouchers()
        {
            var articleProvidersDb = this.articleProviderService.GetAll();

            string folder = Path.Combine(env.WebRootPath, containerBackup, containerArticlesProviders);

            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, true);
                Directory.CreateDirectory(folder);
            }
            else
            {
                Directory.CreateDirectory(folder);
            }

            foreach (var articleProvider in articleProvidersDb)
            {
                var articleProviderVoucherName = articleProvider.Voucher.Split("/").LastOrDefault();
                var articlePath = Path.Combine(env.WebRootPath, containerArticlesProviders, articleProviderVoucherName);
                var articleBackupPath = Path.Combine(folder, articleProviderVoucherName);

                if (!System.IO.File.Exists(articleBackupPath))
                {
                    System.IO.File.Copy(articlePath, articleBackupPath);
                }

            }
            var pathZip = Path.Combine(env.WebRootPath, containerBackup, "articles-providers.zip");
            if (System.IO.File.Exists(pathZip))
            {
                System.IO.File.Delete(pathZip);
                ZipFile.CreateFromDirectory(folder, pathZip);
            }
            else
            {
                ZipFile.CreateFromDirectory(folder, pathZip);
            }
        }

        private async Task BackupDatabase()
        {
            string folder = Path.Combine(env.WebRootPath, containerBackup, "database");

            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, true);
                Directory.CreateDirectory(folder);
            }
            else
            {
                Directory.CreateDirectory(folder);
            }

            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Nombre de la base de datos
            string databaseName = "MegaHerdtAPI";

            // Genera un nombre de archivo de copia de seguridad único
            string backupFileName = $"{databaseName}_Backup_{DateTime.Now:yyyyMMddHHmmss}.bak";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Ejecuta el comando de copia de seguridad
                using (SqlCommand command = new SqlCommand($"BACKUP DATABASE {databaseName} TO DISK='{Path.Combine(folder, backupFileName)}'", connection))
                {
                    command.ExecuteNonQuery();
                }
            }

            var pathZip = Path.Combine(env.WebRootPath, containerBackup, "database.zip");
            if (System.IO.File.Exists(pathZip))
            {
                System.IO.File.Delete(pathZip);
                ZipFile.CreateFromDirectory(folder, pathZip);
            }
            else
            {
                ZipFile.CreateFromDirectory(folder, pathZip);
            }

            //var dbPath = Path.Combine(Environment.CurrentDirectory, "MegaHerdtAPI.db");
            //var dbBackupPath = Path.Combine(folder, "MegaHerdtAPI.db");

            //if (!System.IO.File.Exists(dbBackupPath))
            //{
            //    System.IO.File.Copy(dbPath, dbBackupPath);
            //}

            //var pathZip = Path.Combine(env.WebRootPath, containerBackup, "database.zip");
            //if (System.IO.File.Exists(pathZip))
            //{
            //    System.IO.File.Delete(pathZip);
            //    ZipFile.CreateFromDirectory(folder, pathZip);
            //}
            //else
            //{
            //    ZipFile.CreateFromDirectory(folder, pathZip);
            //}

        }


    }
}
