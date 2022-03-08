using AutoMapper;
using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.DTOs.Shipment;
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
    public class PurchasesController : ControllerBase
    {
        private readonly PurchaseService PurchaseService;
        private readonly IMapper Mapper;
        public PurchasesController(PurchaseService PurchaseService, IMapper Mapper)
        {
            this.PurchaseService = PurchaseService;
            this.Mapper = Mapper;
        }

        [HttpGet("clientPurchases/{clientId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<PurchaseDTO>> GetClientPurchases(string clientId)
        {
            try
            {
                if (UserValidations.UserIdIsOk(clientId, HttpContext))
                {
                    var clientPurchases = this.PurchaseService.GetClientPurchases(clientId);
                    return this.Mapper.Map<List<PurchaseDTO>>(clientPurchases);
                }
                throw new Exception("User id is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{purchaseId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<PurchaseDTO> GetPurchaseById(int purchaseId)
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Id == purchaseId;
                var purchase = this.PurchaseService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<PurchaseDTO>(purchase);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<PurchaseDTO>> GetAll()
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Shipment != null && x.Shipment.TransportCompany == null;
                var purchases = this.PurchaseService.GetBy(filter)
                    .OrderByDescending(x => x.Date);
                return this.Mapper.Map<List<PurchaseDTO>>(purchases);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("shipment/update")]
        public async Task<ActionResult<bool>> Put([FromBody] ShipmentUpdateDTO shipmentUpdateDTO)
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Id == shipmentUpdateDTO.PurchaseId;
                var purchaseDb = this.PurchaseService.GetBy(filter).FirstOrDefault();
                var shipment = this.Mapper.Map(shipmentUpdateDTO, purchaseDb?.Shipment);
                purchaseDb.Shipment = shipment;
                await this.PurchaseService.Update(purchaseDb);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
