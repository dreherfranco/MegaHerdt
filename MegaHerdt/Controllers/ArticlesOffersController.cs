using AutoMapper;
using MegaHerdt.API.DTOs.ArticleOffer;
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
    public class ArticlesOffersController : ControllerBase
    {
        private readonly ArticleOfferService articleOfferService;
        private readonly IMapper Mapper;
        public ArticlesOffersController(ArticleOfferService articleOfferService, IMapper Mapper)
        {
            this.articleOfferService = articleOfferService;
            this.Mapper = Mapper;
        }

        [HttpGet]
        public ActionResult<List<ArticleOfferDTO>> Get()
        {
            try
            {
                var articlesOffers = articleOfferService.GetAll();
                return this.Mapper.Map<List<ArticleOfferDTO>>(articlesOffers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<ArticleOfferDTO> Get(int id)
        {
            try
            {
                Expression<Func<ArticleOffer, bool>> filter = x => x.Id == id;
                var articlesOffers = articleOfferService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleOfferDTO>(articlesOffers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<ArticleOfferDTO>> Post([FromBody] ArticleOfferCreationDTO articleOfferDTO)
        {
            try
            {              
                var articleOffer = this.Mapper.Map<ArticleOffer>(articleOfferDTO);
                articleOffer = await articleOfferService.Create(articleOffer);
                return this.Mapper.Map<ArticleOfferDTO>(articleOffer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult> Put([FromBody] ArticleOfferDTO articleOfferDTO)
        {
            try
            {
                Expression<Func<ArticleOffer, bool>> filter = x => x.Id == articleOfferDTO.Id;
                var articleOfferDb = this.articleOfferService.GetBy(filter).FirstOrDefault();            
                articleOfferDb = this.Mapper.Map(articleOfferDTO, articleOfferDb);
                await articleOfferService.Update(articleOfferDb);
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
                Expression<Func<ArticleOffer, bool>> filter = x => x.Id == id;
                var articleOffer = this.articleOfferService.GetBy(filter).FirstOrDefault();
                await articleOfferService.Delete(articleOffer);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
