using AutoMapper;
using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AuthorizeRoles(Role.Admin, Role.Empleado)]
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
                var reparationsStates = reparationStateService.GetById(id);
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
                var reparationStateDb = this.reparationStateService.GetById(reparationStateDTO.Id);
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
                var reparationState = this.reparationStateService.GetById(id);
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
