using MegaHerdt.API.DTOs.Backup;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public BackupsController(IWebHostEnvironment env, ArticleService articleService,
            ArticleProviderService articleProviderService, IHttpContextAccessor httpContextAccessor)
        {
            this.articleService = articleService;
            this.env = env;
            this.articleProviderService = articleProviderService;
            this.httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("backup")]
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

                var actualUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
                var urlArticlesZip = Path.Combine(actualUrl, Path.Combine(this.containerBackup, "articles.zip")).Replace("\\", "/");
                var urlArticlesProvidersZip = Path.Combine(actualUrl, Path.Combine(this.containerBackup, "articles-providers.zip")).Replace("\\", "/");
                
                var urlsDTO = new URLsZipDTO()
                { 
                    UrlArticlesZip = urlArticlesZip, 
                    UrlArticlesProvidersZip = urlArticlesProvidersZip 
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

                if (!System.IO.File.Exists(articleBackupPath))
                {
                    System.IO.File.Copy(articlePath, articleBackupPath);
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
    }
}
