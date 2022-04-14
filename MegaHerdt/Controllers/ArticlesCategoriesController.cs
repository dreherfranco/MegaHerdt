using AutoMapper;
using MegaHerdt.API.DTOs.ArticleCategory;
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
    public class ArticlesCategoriesController : ControllerBase
    {
        private readonly ArticleCategoryService articleCategoryService;
        private readonly IMapper Mapper;
        public ArticlesCategoriesController(ArticleCategoryService articleCategoryService, IMapper Mapper)
        {
            this.articleCategoryService = articleCategoryService;
            this.Mapper = Mapper;
        }

        [HttpGet]
        public ActionResult<List<ArticleCategoryDTO>> Get()
        {
            try
            {
                var articlesCategories = articleCategoryService.GetAll();
                return this.Mapper.Map<List<ArticleCategoryDTO>>(articlesCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<ArticleCategoryDTO> Get(int id)
        {
            try
            {
                Expression<Func<ArticleCategory, bool>> filter = x => x.Id == id;
                var articlesCategories = articleCategoryService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleCategoryDTO>(articlesCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("statistics")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<ArticleCategoryStatisticsDTO>> GetStatistics()
        {
            try
            {
                var articlesCategories = articleCategoryService.GetAll();          
                return this.Mapper.Map<List<ArticleCategoryStatisticsDTO>>(articlesCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost("create")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<ArticleCategoryDTO>> Post([FromBody] ArticleCategoryCreationDTO articleCategoryDTO)
        {
            try
            {
                articleCategoryDTO.Name = articleCategoryDTO.Name.ToUpper();
                if (!this.articleCategoryService.Exist(articleCategoryDTO.Name))
                {
                    var articleCategory = this.Mapper.Map<ArticleCategory>(articleCategoryDTO);
                    articleCategory = await articleCategoryService.Create(articleCategory);
                    return this.Mapper.Map<ArticleCategoryDTO>(articleCategory);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> Put([FromBody] ArticleCategoryDTO articleCategoryDTO)
        {
            try
            {            
                articleCategoryDTO.Name = articleCategoryDTO.Name.ToUpper();
                if (!this.articleCategoryService.Exist(articleCategoryDTO.Name))
                {
                    Expression<Func<ArticleCategory, bool>> filter = x => x.Id == articleCategoryDTO.Id;
                    var articleCategoryDb = this.articleCategoryService.GetBy(filter).FirstOrDefault();
                    articleCategoryDb = this.Mapper.Map(articleCategoryDTO, articleCategoryDb);
                    await articleCategoryService.Update(articleCategoryDb);
                    return true;
                }
                return BadRequest();
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
                Expression<Func<ArticleCategory, bool>> filter = x => x.Id == id;
                var articleCategory = this.articleCategoryService.GetBy(filter).FirstOrDefault();
                await articleCategoryService.Delete(articleCategory);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
