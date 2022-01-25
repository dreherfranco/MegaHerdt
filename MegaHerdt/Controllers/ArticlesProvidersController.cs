using AutoMapper;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleProvider;
using MegaHerdt.API.FileManager.Interface;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  //  [AuthorizeRoles(Role.Admin, Role.Empleado)]
    public class ArticlesProvidersController : ControllerBase
    {
        private readonly ArticleProviderService articleProviderService;
        private readonly IMapper Mapper;
        private readonly IFileManager fileManager;
        private readonly string container = "articles-providers";
        public ArticlesProvidersController(ArticleProviderService articleProviderService, IMapper Mapper
            ,IFileManager fileManager)
        {
            this.articleProviderService = articleProviderService;
            this.Mapper = Mapper;
            this.fileManager = fileManager;
        }

        

        [HttpGet]
        public ActionResult<List<ArticleProviderDTO>> GetArticlesProviders()
        {
            try
            {
                var articlesProviders = articleProviderService.GetAll();
                return this.Mapper.Map<List<ArticleProviderDTO>>(articlesProviders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("article-provider/add")]     
        public async Task<ActionResult> Post([FromForm] ArticleProviderCreationDTO articleProviderDTO)
        {
            try
            {
             //   Expression<Func<Article, bool>> filter = x => x.Id == articleProviderDTO.ArticleId;
              //  var articleDb = this.articleService.GetBy(filter).FirstOrDefault();

                var articleProvider = Mapper.Map<ArticleProvider>(articleProviderDTO);
                //   articleDb.ArticlesProviders.Add(articleProvider);
                // articleDb.AddStock(articleProvider.ArticleQuantity);
                //     await articleService.Update(articleDb);
                if (articleProviderDTO.Voucher != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await articleProviderDTO.Voucher.CopyToAsync(memoryStream);
                        var content = memoryStream.ToArray();
                        var extension = Path.GetExtension(articleProviderDTO.Voucher.FileName);
                        articleProvider.Voucher = await fileManager.SaveFile(content, extension, container,
                            articleProviderDTO.Voucher.ContentType);
                    }
                }
                await articleProviderService.Create(articleProvider);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
