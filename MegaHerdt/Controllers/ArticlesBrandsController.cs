using AutoMapper;
using MegaHerdt.API.DTOs.ArticleBrand;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AuthorizeRoles(Role.Admin, Role.Empleado)]
    public class ArticlesBrandsController : ControllerBase
    {

        private readonly ArticleBrandService articleBrandService;
        private readonly IMapper Mapper;
        public ArticlesBrandsController(ArticleBrandService articleBrandService, IMapper Mapper)
        {
            this.articleBrandService = articleBrandService;
            this.Mapper = Mapper;
        }

        [HttpGet]
        public ActionResult<List<ArticleBrandDTO>> Get()
        {
            try
            {
                var articlesBrands = articleBrandService.GetAll();
                return this.Mapper.Map<List<ArticleBrandDTO>>(articlesBrands);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<ArticleBrandDTO> Get(int id)
        {
            try
            {
                Expression<Func<ArticleBrand, bool>> filter = x => x.Id == id;
                var articlesBrands = articleBrandService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleBrandDTO>(articlesBrands);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<ArticleBrandDTO>> Post([FromBody] ArticleBrandCreationDTO articleBrandDTO)
        {
            try
            {
                articleBrandDTO.Name = articleBrandDTO.Name.ToUpper();
                var articleBrand = this.Mapper.Map<ArticleBrand>(articleBrandDTO);
                articleBrand = await articleBrandService.Create(articleBrand);
                return this.Mapper.Map<ArticleBrandDTO>(articleBrand);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult> Put([FromBody] ArticleBrandDTO articleBrandDTO)
        {
            try
            {
                Expression<Func<ArticleBrand, bool>> filter = x => x.Id == articleBrandDTO.Id;
                var articleBrandDb = this.articleBrandService.GetBy(filter).FirstOrDefault();
                articleBrandDTO.Name = articleBrandDTO.Name.ToUpper();
                articleBrandDb = this.Mapper.Map(articleBrandDTO, articleBrandDb);
                await articleBrandService.Update(articleBrandDb);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Expression<Func<ArticleBrand, bool>> filter = x => x.Id == id;
                var articleBrand = this.articleBrandService.GetBy(filter).FirstOrDefault();
                await articleBrandService.Delete(articleBrand);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
