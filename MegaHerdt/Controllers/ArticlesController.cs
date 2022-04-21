using AutoMapper;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleProvider;
using MegaHerdt.API.DTOs.Pagination;
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

        [HttpGet("get-article-names")]
        public ActionResult<List<ArticleNameDTO>> GetArticlesNames()
        {
            try
            {
                var articles = articleService.GetAll();
                return this.Mapper.Map<List<ArticleNameDTO>>(articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ArticleDTO> GetById(int id)
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

        [HttpGet("get-by-name/{name}")]
        public ActionResult<ArticleDTO> GetByName(string name)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Name == name;
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
        public async Task<ActionResult<bool>> Put([FromForm] ArticleUpdateDTO articleDTO)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == articleDTO.Id;
                var articleDb = this.articleService.GetBy(filter).FirstOrDefault();

               /* if (articleDTO.Image != null)
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
                }*/

                articleDb = this.Mapper.Map(articleDTO, articleDb);
                await articleService.Update(articleDb);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update-image")]
        //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //   [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> UpdateImage([FromForm] ArticleUpdateImageDTO articleDTO)
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

                await articleService.Update(articleDb);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update-price-by-category")]
        //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //   [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<List<ArticleDTO>>> UpdatePriceByCategory([FromForm] ArticlePriceUpdateByCategoryDTO articleDTO)
        {
            try
            {
                var articles = await this.articleService.UpdatePriceByCategory(articleDTO.CategoryId, articleDTO.PricePercentage);

                return this.Mapper.Map<List<ArticleDTO>>(articles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == id;
                var article = this.articleService.GetBy(filter).FirstOrDefault();
                await articleService.Delete(article);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //Obtener articulos con los proveedores
        [HttpGet("article-provider")]
        public ActionResult<List<ArticleDetailDTO>> GetArticlesWithProvisions()
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
        public ActionResult<ArticleDetailDTO> GetArticlesWithProvision(int id)
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


    }
}
