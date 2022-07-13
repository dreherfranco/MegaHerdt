using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        public BackupsController(IWebHostEnvironment env, ArticleService articleService,
            ArticleProviderService articleProviderService)
        {
            this.articleService = articleService;
            this.env = env;
            this.articleProviderService = articleProviderService;
        }

        [HttpPost("backup")]
        public async Task<ActionResult<bool>> Backup()
        {
            try
            {
                await BackupArticles();
                await BackupArticlesProviders();


                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private async Task BackupArticles()
        {
            var articlesDb = this.articleService.GetAll();

            foreach (var article in articlesDb)
            {
                if (string.IsNullOrWhiteSpace(env.WebRootPath))
                {
                    env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                }

                string folder = Path.Combine(env.WebRootPath, containerBackup, containerArticles);

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var articleImageName = article.Image.Split("/").LastOrDefault();
                var articlePath = Path.Combine(env.WebRootPath, containerArticles, articleImageName);
                var articleBackupPath = Path.Combine(folder, articleImageName);

                if (!System.IO.File.Exists(articleBackupPath))
                {
                    System.IO.File.Copy(articlePath, articleBackupPath);
                }

            }
        }

        private async Task BackupArticlesProviders()
        {
            var articleProvidersDb = this.articleProviderService.GetAll();

            foreach (var articleProvider in articleProvidersDb)
            {
                if (string.IsNullOrWhiteSpace(env.WebRootPath))
                {
                    env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                }

                string folder = Path.Combine(env.WebRootPath, containerBackup, containerArticlesProviders);

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var articleProviderVoucherName = articleProvider.Voucher.Split("/").LastOrDefault();
                var articlePath = Path.Combine(env.WebRootPath, containerArticlesProviders, articleProviderVoucherName);
                var articleBackupPath = Path.Combine(folder, articleProviderVoucherName);

                if (!System.IO.File.Exists(articleBackupPath))
                {
                    System.IO.File.Copy(articlePath, articleBackupPath);
                }

            }
        }
    }
}
