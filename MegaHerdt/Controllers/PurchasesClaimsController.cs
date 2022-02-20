using AutoMapper;
using MegaHerdt.API.DTOs.PurchaseClaim;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using MegaHerdt.Services.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesClaimsController : ControllerBase
    {
        private readonly PurchaseClaimService PurchaseClaimService;
        private readonly IMapper Mapper;
        private readonly IMailerService MailService;
        public PurchasesClaimsController(PurchaseClaimService reparationClaimService, IMapper mapper, IMailerService mailService)
        {
            this.PurchaseClaimService = reparationClaimService;
            this.Mapper = mapper;
            this.MailService = mailService;
        }

        [HttpGet("getByClientId/{clientId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<PurchaseClaimDTO>> GetByClientId(string clientId)
        {
            try
            {
                var purchasesClaims = this.PurchaseClaimService.GetByClientId(clientId);
                return this.Mapper.Map<List<PurchaseClaimDTO>>(purchasesClaims);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<PurchaseClaimDTO> GetById(int id)
        {
            try
            {
                Expression<Func<PurchaseClaim, bool>> filter = x => x.Id == id;
                var purchaseClaim = this.PurchaseClaimService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<PurchaseClaimDTO>(purchaseClaim);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<PurchaseClaimDTO>> GetAllReparationsClaims()
        {
            try
            {
                var purchasesClaims = this.PurchaseClaimService.GetAll()
                    .OrderBy(x => x.Answered);
                return this.Mapper.Map<List<PurchaseClaimDTO>>(purchasesClaims);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("create")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<PurchaseClaimDTO>> Create([FromBody] PurchaseClaimCreationDTO purchaseClaimDTO)
        {
            try
            {
                if (UserValidations.UserIdIsOk(purchaseClaimDTO.ClientId, HttpContext))
                {
                    var purchaseClaim = Mapper.Map<PurchaseClaim>(purchaseClaimDTO);
                    var purchaseClaimCreate = await this.PurchaseClaimService.Create(purchaseClaim);
                    return this.Mapper.Map<PurchaseClaimDTO>(purchaseClaimCreate);
                }
                throw new Exception("User id is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<bool>> Update([FromBody] PurchaseClaimUpdateDTO purchaseClaimDTO)
        {
            try
            {
                if (UserValidations.UserIdIsOk(purchaseClaimDTO.ClientId, HttpContext))
                {
                    Expression<Func<PurchaseClaim, bool>> filter = x => x.Id == purchaseClaimDTO.Id;
                    var purchaseClaimDb = this.PurchaseClaimService.GetBy(filter).FirstOrDefault();
                    purchaseClaimDb = this.Mapper.Map(purchaseClaimDTO, purchaseClaimDb);
                    await this.PurchaseClaimService.Update(purchaseClaimDb);
                    return true;
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
                Expression<Func<PurchaseClaim, bool>> filter = x => x.Id == id;
                var purchaseClaim = this.PurchaseClaimService.GetBy(filter).FirstOrDefault();
                if (UserValidations.UserIdIsOk(purchaseClaim.ClientId, HttpContext))
                {
                    await PurchaseClaimService.Delete(purchaseClaim);
                    return NoContent();
                }
                throw new Exception("Client id is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("answer")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> Answer([FromBody] PurchaseClaimAnswerDTO purchaseClaimDTO)
        {
            try
            {
                Expression<Func<PurchaseClaim, bool>> filter = x => x.Id == purchaseClaimDTO.Id;
                var purchaseClaimDb = this.PurchaseClaimService.GetBy(filter).FirstOrDefault();
                var mailRequest = new MailRequest()
                {
                    ToEmail = purchaseClaimDb.Client.Email,
                    Body = purchaseClaimDTO.Answer,
                    Subject = "Respuesta a reclamo de compra"
                };

                await this.MailService.SendEmailAsync(mailRequest);
                purchaseClaimDb.Answered = true;
                await this.PurchaseClaimService.Update(purchaseClaimDb);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}
