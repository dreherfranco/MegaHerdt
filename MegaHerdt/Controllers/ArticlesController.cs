using AutoMapper;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleProvider;
using MegaHerdt.API.ExtensionMethods;
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
    public class ArticlesController : ControllerBase
    {
        private readonly ArticleService articleService;
        private readonly IMapper Mapper;
        private readonly IFileManager fileManager;
        private readonly string container = "articles";
        public ArticlesController(ArticleService articleService, IMapper Mapper, IFileManager fileManager)
        {
            this.articleService = articleService;
            this.Mapper = Mapper;
            this.fileManager = fileManager;
        }

        [HttpGet]
        public ActionResult<List<ArticleDTO>> GetAllArticles()
        {
            try
            {
                var articles = articleService.GetAll();
                
                return this.Mapper.Map<List<ArticleDTO>>(articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ArticleDTO> Get(int id)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == id;
                var article = articleService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleDTO>(article);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("articles-on-offers")]
        public ActionResult<List<ArticleDTO>> GetAllArticlesOnOffer() 
        { 
            try
            {
                var articles = articleService.GetArticlesOnOffer();              
                return this.Mapper.Map<List<ArticleDTO>>(articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<ArticleDTO>>> Filter([FromQuery] ArticleFilterDTO articleDTO )
        {
            try
            {  
                var articlesQueryable = this.articleService.GetAll().AsQueryable();
                if(articleDTO.BrandId != 0)
                {
                    articlesQueryable = articlesQueryable.Where(x => x.BrandId == articleDTO.BrandId);
                }
                if(articleDTO.CategoryId != 0)
                {
                    articlesQueryable = articlesQueryable.Where(x => x.CategoryId == articleDTO.CategoryId);
                }
                if(!string.IsNullOrWhiteSpace(articleDTO.Name))
                {
                    articlesQueryable = articlesQueryable.Where(x => x.Name.ToUpper().Contains(articleDTO.Name.ToUpper()));
                }
                await HttpContext.InsertParametersPagination(articlesQueryable, articleDTO.RecordsPerPage);
                var articles = articlesQueryable.Paginate(articleDTO.Pagination).ToList();

                return this.Mapper.Map<List<ArticleDTO>>(articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost("create")]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //  [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<ArticleDTO>> Post([FromForm] ArticleCreationDTO articleDTO)
        {
            try
            {
                var article = this.Mapper.Map<Article>(articleDTO);
                
                if (articleDTO.Image != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await articleDTO.Image.CopyToAsync(memoryStream);
                        var content = memoryStream.ToArray();
                        var extension = Path.GetExtension(articleDTO.Image.FileName);
                        article.Image = await fileManager.SaveFile(content, extension, container,
                            articleDTO.Image.ContentType);
                    }
                }
            
                article = await articleService.Create(article);
                return this.Mapper.Map<ArticleDTO>(article);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
      //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
     //   [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult> Put([FromForm] ArticleUpdateDTO articleDTO)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == articleDTO.Id;
                var articleDb = this.articleService.GetBy(filter).FirstOrDefault();

                if (articleDTO.Image != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await articleDTO.Image.CopyToAsync(memoryStream);
                        var content = memoryStream.ToArray();
                        var extension = Path.GetExtension(articleDTO.Image.FileName);
                        articleDb.Image = await fileManager.EditFile(content, extension, container,
                            articleDb.Image,
                            articleDTO.Image.ContentType);
                    }
                }

                articleDb = this.Mapper.Map(articleDTO, articleDb);
                await articleService.Update(articleDb);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == id;
                var article = this.articleService.GetBy(filter).FirstOrDefault();
                await articleService.Delete(article);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        #region ArticleProvider
        //Obtener articulos con los proveedores
        [HttpGet("article-provider")]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //  [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<ArticleDetailDTO>> GetArticlesProviders()
        {
            try
            {
                var articles = articleService.GetAll();
                return this.Mapper.Map<List<ArticleDetailDTO>>(articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("article-provider/{id}")]
        public ActionResult<ArticleDetailDTO> GetArticlesProviders(int id)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == id;
                var article = articleService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleDetailDTO>(article);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("article-provider/add")]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult> Post([FromBody] ArticleProviderCreationDTO articleProviderDTO)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == articleProviderDTO.ArticleId;
                var articleDb = this.articleService.GetBy(filter).FirstOrDefault();

                var articleProvider = Mapper.Map<ArticleProvider>(articleProviderDTO);
                articleDb.ArticlesProviders.Add(articleProvider);
                articleDb.AddStock(articleProvider.ArticleQuantity);
                await articleService.Update(articleDb);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        #endregion ArticleProvider

        
    }
}
