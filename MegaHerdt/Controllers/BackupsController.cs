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

        #region Hacer Respaldo
        private void AddToZip(string zipPath, string folderToAdd, string destinationFolderInZip)
        {
            using (ZipArchive zip = ZipFile.Open(zipPath, ZipArchiveMode.Update))
            {
                var files = Directory.GetFiles(folderToAdd, "*", SearchOption.AllDirectories);
                foreach (var file in files)
                {
                    var entryName = Path.Combine(destinationFolderInZip, Path.GetRelativePath(folderToAdd, file)); // Get the relative path for nested folders
                    zip.CreateEntryFromFile(file, entryName);
                }
            }
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

                string mainZipPath = Path.Combine(env.WebRootPath, containerBackup, "backup.zip");

                if (System.IO.File.Exists(mainZipPath))
                {
                    System.IO.File.Delete(mainZipPath);
                }

                await BackupArticlesImages(mainZipPath);
                await BackupArticlesProvidersVouchers(mainZipPath);
                await BackupDatabase(mainZipPath);

                var actualUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
                var urlMainZip = Path.Combine(actualUrl, Path.Combine(this.containerBackup, "backup.zip")).Replace("\\", "/");

                var urlsDTO = new URLsZipDTO()
                {
                    UrlMainZip = urlMainZip
                };

                return urlsDTO;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private async Task BackupArticlesImages(string mainZipPath)
        {
            var articlesDb = this.articleService.GetAll();
            string folder = Path.Combine(env.WebRootPath, containerBackup, containerArticles);

            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, true);
            }
            Directory.CreateDirectory(folder);

            foreach (var article in articlesDb)
            {
                var articleImageName = article.Image.Split("/").LastOrDefault();
                var articlePath = Path.Combine(env.WebRootPath, containerArticles, articleImageName);
                var articleBackupPath = Path.Combine(folder, articleImageName);

                if (System.IO.File.Exists(articlePath))
                {
                    System.IO.File.Copy(articlePath, articleBackupPath);
                }
            }

            AddToZip(mainZipPath, folder, "articles");
            Directory.Delete(folder, true); // Cleanup the temporary folder
        }

        private async Task BackupArticlesProvidersVouchers(string mainZipPath)
        {
            var articleProvidersDb = this.articleProviderService.GetAll();
            string folder = Path.Combine(env.WebRootPath, containerBackup, containerArticlesProviders);

            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, true);
            }
            Directory.CreateDirectory(folder);

            foreach (var articleProvider in articleProvidersDb)
            {
                if (!string.IsNullOrEmpty(articleProvider.Voucher))
                {
                    var articleProviderVoucherName = articleProvider.Voucher.Split("/").LastOrDefault();
                    var articlePath = Path.Combine(env.WebRootPath, containerArticlesProviders, articleProviderVoucherName);
                    var articleBackupPath = Path.Combine(folder, articleProviderVoucherName);

                    if (System.IO.File.Exists(articlePath))
                    {
                        System.IO.File.Copy(articlePath, articleBackupPath);
                    }
                }
            }

            AddToZip(mainZipPath, folder, "articles-providers");
            Directory.Delete(folder, true); // Cleanup the temporary folder
        }

        private async Task BackupDatabase(string mainZipPath)
        {
            string folder = Path.Combine(env.WebRootPath, containerBackup, "database");

            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, true);
            }
            Directory.CreateDirectory(folder);

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            string databaseName = "MegaHerdtAPI";
            string backupFileName = $"{databaseName}_Backup_{DateTime.Now:yyyyMMddHHmmss}.bak";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand($"BACKUP DATABASE {databaseName} TO DISK='{Path.Combine(folder, backupFileName)}'", connection))
                {
                    command.ExecuteNonQuery();
                }
            }

            AddToZip(mainZipPath, folder, "database");
            Directory.Delete(folder, true); // Cleanup the temporary folder
        }

        #endregion

        #region Restaurar
        [HttpPost("restore")]
        public async Task<IActionResult> Restaurar([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No se ha cargado ningún archivo.");

            var tempPath = Path.Combine(Path.GetTempPath(), Path.GetFileNameWithoutExtension(Path.GetRandomFileName()));
            Directory.CreateDirectory(tempPath);

            var zipPath = Path.Combine(tempPath, file.FileName);

            using (var stream = new FileStream(zipPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            ZipFile.ExtractToDirectory(zipPath, tempPath);

            var backupPath = Directory.GetFiles(Path.Combine(tempPath, "database"), "*.bak")[0];
            var articlesPath = Path.Combine(tempPath, "articles");
            var articlesProvidersPath = Path.Combine(tempPath, "articles-providers");

            var wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var articlesDestinationPath = Path.Combine(wwwrootPath, "articles");
            var articlesProvidersDestinationPath = Path.Combine(wwwrootPath, "articles-providers");
            
            // Eliminar las carpetas de destino si existen
            if (Directory.Exists(articlesDestinationPath))
            {
                Directory.Delete(articlesDestinationPath, true);
            }
            if (Directory.Exists(articlesProvidersDestinationPath))
            {
                Directory.Delete(articlesProvidersDestinationPath, true);
            }

            // Crear las carpetas de destino
            Directory.CreateDirectory(articlesDestinationPath);
            Directory.CreateDirectory(articlesProvidersDestinationPath);
            
            if (Directory.Exists(articlesPath))
            {
                // Mover las imágenes de artículos
                foreach (var imagePath in Directory.GetFiles(articlesPath))
                {
                    var fileName = Path.GetFileName(imagePath);
                    System.IO.File.Copy(imagePath, Path.Combine(articlesDestinationPath, fileName), true);
                }
            }

            if (Directory.Exists(articlesProvidersPath))
            {
                // Mover las imágenes de proveedores de artículos
                foreach (var imagePath in Directory.GetFiles(articlesProvidersPath))
                {
                    var fileName = Path.GetFileName(imagePath);
                    System.IO.File.Copy(imagePath, Path.Combine(articlesProvidersDestinationPath, fileName), true);
                }
            }
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var script = $@"
                USE master;
                ALTER DATABASE [MegaHerdtAPI] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
                RESTORE DATABASE [MegaHerdtAPI]
                FROM DISK = N'{backupPath}'
                WITH FILE = 1,
                MOVE N'MegaHerdtAPI' TO N'C:\\respaldo\\NuevaUbicacionDeDatos.mdf',
                MOVE N'MegaHerdtAPI_log' TO N'C:\\respaldo\\NuevaUbicacionDeLog.ldf',
                NOUNLOAD,
                REPLACE,
                STATS = 5;
                ALTER DATABASE [MegaHerdtAPI] SET MULTI_USER;
            ";

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(script, connection))
                {
                    await command.ExecuteNonQueryAsync();
                }
            }

            // Eliminar los archivos temporales
            Directory.Delete(tempPath, true);

            return Ok("Restauración completada");
        }

        #endregion

    }
}
