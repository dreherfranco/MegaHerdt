using AutoMapper;
using MegaHerdt.API.DTOs.Provider;
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
    public class ProvidersController : ControllerBase
    {
        private readonly ProviderService providerService;
        private readonly IMapper Mapper;
        public ProvidersController(ProviderService providerService, IMapper Mapper)
        {
            this.providerService = providerService;
            this.Mapper = Mapper;
        }

        [HttpGet]
        public ActionResult<List<ProviderDTO>> Get()
        {
            try
            {
                var providers = providerService.GetAll();
                return this.Mapper.Map<List<ProviderDTO>>(providers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<ProviderDTO> Get(int id)
        {
            try
            {
                Expression<Func<Provider, bool>> filter = x => x.Id == id;
                var provider = providerService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ProviderDTO>(provider);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProviderDTO>> Post([FromBody] ProviderCreationDTO providerDTO)
        {
            try
            {
                var provider = this.Mapper.Map<Provider>(providerDTO);
                provider = await providerService.Create(provider);
                return this.Mapper.Map<ProviderDTO>(provider);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult> Put([FromBody] ProviderDTO providerDTO)
        {
            try
            {
                Expression<Func<Provider, bool>> filter = x => x.Id == providerDTO.Id;
                var providerDb = this.providerService.GetBy(filter).FirstOrDefault();
                providerDb = this.Mapper.Map(providerDTO, providerDb);
                await providerService.Update(providerDb);
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
                Expression<Func<Provider, bool>> filter = x => x.Id == id;
                var provider = this.providerService.GetBy(filter).FirstOrDefault();
                await providerService.Delete(provider);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
