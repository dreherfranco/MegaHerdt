using AutoMapper;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.ExtensionMethods;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ArticleService articleService;
        private readonly IMapper Mapper;
        public ArticlesController(ArticleService articleService, IMapper Mapper)
        {
            this.articleService = articleService;
            this.Mapper = Mapper;
        }

        [HttpGet]
        public ActionResult<List<ArticleDTO>> Get()
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
                var articles = articleService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleDTO>(articles);
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<ArticleDTO>> Post([FromBody] ArticleCreationDTO articleDTO)
        {
            try
            {
                var article = this.Mapper.Map<Article>(articleDTO);
                article = await articleService.Create(article);
                return this.Mapper.Map<ArticleDTO>(article);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult> Put([FromBody] ArticleDTO articleDTO)
        {
            try
            {
                Expression<Func<Article, bool>> filter = x => x.Id == articleDTO.Id;
                var articleDb = this.articleService.GetBy(filter).FirstOrDefault();
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
    }
}
