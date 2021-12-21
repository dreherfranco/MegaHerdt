﻿using AutoMapper;
using MegaHerdt.API.DTOs.ReparationClaim;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReparationsClaimsController : ControllerBase
    {
        private readonly ReparationClaimService ReparationClaimService;
        private readonly IMapper Mapper;
        public ReparationsClaimsController(ReparationClaimService reparationClaimService, IMapper mapper)
        {
            this.ReparationClaimService = reparationClaimService;
            this.Mapper = mapper;
        }

        [HttpGet("getByClientId/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<ReparationClaimDTO>> GetAllReparationsClaims(string clientId)
        {
            try
            {
                var reparationsClaims = this.ReparationClaimService.GetByClientId(clientId);
                return this.Mapper.Map<List<ReparationClaimDTO>>(reparationsClaims);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-all")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<ReparationClaimDTO>> GetAllReparationsClaims()
        {
            try
            {
                var reparationsClaims = this.ReparationClaimService.GetAll();
                return this.Mapper.Map<List<ReparationClaimDTO>>(reparationsClaims);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("create")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<ReparationClaimDTO>> Create([FromBody] ReparationClaimCreationDTO reparationClaimDTO)
        {
            try
            {
                var reparationClaim = Mapper.Map<ReparationClaim>(reparationClaimDTO);
                var reparationClaimCreate = await this.ReparationClaimService.Create(reparationClaim);
                return this.Mapper.Map<ReparationClaimDTO>(reparationClaimCreate);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Update([FromBody] ReparationClaimUpdateDTO reparationClaimDTO)
        {
            try
            {
                if (UserValidations.UserIdIsOk(reparationClaimDTO.ClientId, HttpContext))
                {
                    var reparationClaimDb = this.ReparationClaimService.GetById(reparationClaimDTO.Id);
                    reparationClaimDb = this.Mapper.Map(reparationClaimDTO, reparationClaimDb);
                    await this.ReparationClaimService.Update(reparationClaimDb);
                    return NoContent();
                }
                throw new Exception("Client id is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {     
                var reparationClaim = this.ReparationClaimService.GetById(id);
                if (UserValidations.UserIdIsOk(reparationClaim.ClientId, HttpContext))
                {
                    await ReparationClaimService.Delete(reparationClaim);
                    return NoContent();
                }
                throw new Exception("Client id is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
