using AutoMapper;
using MegaHerdt.API.DTOs.Reparation;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using MegaHerdt.Services.Services.Interfaces;
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
        private readonly IMailerService MailService;

        public ReparationsController(ReparationService reparationService, IMapper mapper, IMailerService mailService)
        {
            this.ReparationService = reparationService;
            this.Mapper = mapper;
            this.MailService = mailService;
        }

        [HttpPost("create")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<ReparationDTO>> CreateReparation([FromBody] ReparationCreationDTO reparationDTO)
        {
            try
            {
                var reparation = Mapper.Map<Reparation>(reparationDTO);
                reparation.ReparationStateId = 1;
                reparation.Date = DateTime.UtcNow;
                await this.ReparationService.Create(reparation);

                var reparationCreated = this.ReparationService.GetReparationById(reparation.Id);        
                return this.Mapper.Map<ReparationDTO>(reparationCreated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> UpdateReparation([FromBody] ReparationUpdateDTO reparationDTO)
        {
            try
            {
                var reparationDb = this.ReparationService.GetReparationById(reparationDTO.Id);
                reparationDb = this.Mapper.Map(reparationDTO, reparationDb);
                
                await this.ReparationService.Update(reparationDb);
                
                //MAILER
              //  reparationDb = this.ReparationService.GetReparationById(reparationDb.Id);
            //    var mailRequest = this.ReparationService.mailRequest(reparationDb);
         //       await this.MailService.SendEmailAsync(mailRequest);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("accept-budget")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> UpdateReparationAcceptBudget([FromBody] ReparationUpdateBudgetDTO reparationDTO)
        {
            try
            {
                var reparationDb = this.ReparationService.GetReparationById(reparationDTO.Id);
                await this.ReparationService.UpdateBudget(reparationDb, reparationDTO.IsAccepted, reparationDTO.ApproximateTime);
                
                //MAILER
              //  reparationDb = this.ReparationService.GetReparationById(reparationDb.Id);
           //     var mailRequest = this.ReparationService.mailRequest(reparationDb);
               // await this.MailService.SendEmailAsync(mailRequest);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpDelete("delete/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> ReparationDelete(int id)
        {
            try
            {
                var reparation = this.ReparationService.GetReparationById(id);
                await ReparationService.Delete(reparation);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<ReparationDTO>> GetAllReparations()
        {
            try
            {
                var reparations = this.ReparationService.GetAll();
                return this.Mapper.Map<List<ReparationDTO>>(reparations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-enableds")]
        public async  Task<ActionResult<List<ReparationDTO>>> GetEnabledsReparations()
        {
            try
            {
                var reparations = ReparationService.GetEnabledsReparations();
                return this.Mapper.Map<List<ReparationDTO>>(reparations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
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

        [HttpGet("{reparationId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<ReparationDTO> GetById(int reparationId)
        {
            try
            {
                var reparation = this.ReparationService.GetReparationById(reparationId);
                return this.Mapper.Map<ReparationDTO>(reparation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-by-state-id/{reparationStateId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<ReparationDTO>> GetByStateId(int reparationStateId)
        {
            try
            {
                var reparations = this.ReparationService.GetReparationByStateId(reparationStateId)
                    .ToList();
                return this.Mapper.Map<List<ReparationDTO>>(reparations);
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
