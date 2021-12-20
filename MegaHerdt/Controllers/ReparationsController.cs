using AutoMapper;
using MegaHerdt.API.DTOs.Reparation;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReparationsController : ControllerBase
    {
        private readonly ReparationService ReparationService;
        private readonly IMapper Mapper;
        public ReparationsController(ReparationService reparationService, IMapper mapper)
        {
            this.ReparationService = reparationService;
            this.Mapper = mapper;
        }

        [HttpPost("create")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<ReparationDTO>> CreateReparation([FromBody] ReparationCreationDTO reparationDTO)
        {
            try
            {
                var reparation = Mapper.Map<Reparation>(reparationDTO);
                var reparationCreate = await this.ReparationService.CreateReparation(reparation);
                return this.Mapper.Map<ReparationDTO>(reparationCreate);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult> UpdateReparation([FromBody] ReparationUpdateDTO reparationDTO)
        {
            try
            {
                var reparationDb = this.ReparationService.GetReparationById(reparationDTO.Id);
                reparationDb = this.Mapper.Map(reparationDTO, reparationDb);
                await this.ReparationService.UpdateReparation(reparationDb);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult> ReparationDelete(int id)
        {
            try
            {
                var reparation = this.ReparationService.GetReparationById(id);
                await ReparationService.DeleteReparation(reparation);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("clientReparations/{clientId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<ReparationDTO>> GetClientReparations(string clientId)
        {
            try
            {              
                var clientReparations = this.ReparationService.GetClientReparations(clientId);
                return this.Mapper.Map<List<ReparationDTO>>(clientReparations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("employeeReparations/{employeeId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<ReparationDTO>> GetEmployeeReparations(string employeeId)
        {
            try
            {
                var employeeReparations = this.ReparationService.GetEmployeeReparations(employeeId);
                return this.Mapper.Map<List<ReparationDTO>>(employeeReparations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
