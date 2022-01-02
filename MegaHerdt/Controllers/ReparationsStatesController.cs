using AutoMapper;
using MegaHerdt.API.DTOs.ReparationState;
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
   // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
   // [AuthorizeRoles(Role.Admin, Role.Empleado)]
    public class ReparationsStatesController : ControllerBase
    {
       private readonly ReparationStateService reparationStateService;
       private readonly IMapper Mapper;
        public ReparationsStatesController(ReparationStateService reparationsStatesService, IMapper mapper)
        {
            this.reparationStateService = reparationsStatesService;
            Mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<ReparationStateDTO>> Get()
        {
            try
            {
                var reparationsStates = reparationStateService.GetAll();
                return this.Mapper.Map<List<ReparationStateDTO>>(reparationsStates);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        
        [HttpGet("{id}")]
        public ActionResult<ReparationStateDTO> Get(int id)
        {
            try
            {
                Expression<Func<ReparationState, bool>> filter = x => x.Id == id;
                var reparationsStates = reparationStateService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ReparationStateDTO>(reparationsStates);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
     
        [HttpPost("create")]
        public async Task<ActionResult<ReparationStateDTO>> Post([FromBody] ReparationStateCreationDTO reparationStateDTO)
        {
            try
            {
                reparationStateDTO.Name = reparationStateDTO.Name.ToUpper();
                var reparationState = this.Mapper.Map<ReparationState>(reparationStateDTO);
                reparationState = await reparationStateService.Create(reparationState);
                return this.Mapper.Map<ReparationStateDTO>(reparationState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult> Put([FromBody] ReparationStateDTO reparationStateDTO)
        {
            try
            {
                Expression<Func<ReparationState, bool>> filter = x => x.Id == reparationStateDTO.Id;
                var reparationStateDb = this.reparationStateService.GetBy(filter).FirstOrDefault();
                reparationStateDTO.Name = reparationStateDTO.Name.ToUpper();
                reparationStateDb = this.Mapper.Map(reparationStateDTO, reparationStateDb);
                await reparationStateService.Update(reparationStateDb);
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
                Expression<Func<ReparationState, bool>> filter = x => x.Id == id;
                var reparationState = this.reparationStateService.GetBy(filter).FirstOrDefault();
                await reparationStateService.Delete(reparationState);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
