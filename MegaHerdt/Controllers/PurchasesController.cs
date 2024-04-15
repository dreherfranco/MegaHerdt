using AutoMapper;
using MegaHerdt.API.DTOs.Provider;
using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.API.DTOs.Shipment;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
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
                //Expression<Func<Purchase, bool>> filter = x => x.Shipment != null && x.Shipment.TransportCompany == null;
                var purchases = this.PurchaseService.GetAll()
                    .OrderByDescending(x => x.Date);
                return this.Mapper.Map<List<PurchaseDTO>>(purchases);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-by-state/{state}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<PurchaseDTO>> GetByState(PurchaseState state)
        {
            try
            {
                var purchases = this.PurchaseService.GetByState(state);
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


        #region Update States
        /// <summary>
        /// Pasar del estado Reserved al estado Paid
        /// </summary>
        /// <param name="purchaseDTO"></param>
        /// <returns></returns>
        [HttpPost("from-reserved-to-paid")]
        public async Task<ActionResult<PurchaseDTO>> FromReservedToPaid([FromBody] PurchaseDTO purchaseDTO)
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Id == purchaseDTO.Id;
                var purchaseDb = this.PurchaseService.GetBy(filter).ToList().FirstOrDefault();

                var purchase = this.Mapper.Map(purchaseDTO, purchaseDb);
                var result = await this.PurchaseService.FromReservedToPaid(purchase!, purchaseDTO.PaymentsQuantity ?? 1);

                var dtoResult = this.Mapper.Map<PurchaseDTO>(result);
                return dtoResult;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, status = 400 });
            }
        }

        /// <summary>
        /// Pasar del estado Reserved al estado CancelledReservation
        /// </summary>
        /// <param name="purchaseDTO"></param>
        /// <returns></returns>
        [HttpPost("from-reserved-to-cancelled-reservation")]
        public async Task<ActionResult<PurchaseDTO>> FromReservedToCancelledReservation([FromBody] PurchaseDTO purchaseDTO)
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Id == purchaseDTO.Id;
                var purchaseDb = this.PurchaseService.GetBy(filter).ToList().FirstOrDefault();

                var purchase = this.Mapper.Map(purchaseDTO, purchaseDb);
                var result = await this.PurchaseService.FromReservedToCancelledReservation(purchase!);

                var dtoResult = this.Mapper.Map<PurchaseDTO>(result);
                return dtoResult;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, status = 400 });
            }
        }


        /// <summary>
        /// Pasar del estado Paid al estado Delivered
        /// </summary>
        /// <param name="purchaseDTO"></param>
        /// <returns></returns>
        [HttpPost("from-paid-to-delivered")]
        public async Task<ActionResult<PurchaseDTO>> FromPaidToDelivered([FromBody] PurchaseDTO purchaseDTO)
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Id == purchaseDTO.Id;
                var purchaseDb = this.PurchaseService.GetBy(filter).ToList().FirstOrDefault();

                var purchase = this.Mapper.Map(purchaseDTO, purchaseDb);
                var result = await this.PurchaseService.FromPaidToDelivered(purchase!);

                var dtoResult = this.Mapper.Map<PurchaseDTO>(result);
                return dtoResult;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, status = 400 });
            }
        }

        /// <summary>
        /// Loop en el estado Delivered
        /// </summary>
        /// <param name="purchaseDTO"></param>
        /// <returns></returns>
        [HttpPost("from-delivered-to-delivered")]
        public async Task<ActionResult<PurchaseDTO>> FromDeliveredToDelivered([FromBody] PurchaseDTO purchaseDTO)
        {
            try
            {
                Expression<Func<Purchase, bool>> filter = x => x.Id == purchaseDTO.Id;
                var purchaseDb = this.PurchaseService.GetBy(filter).ToList().FirstOrDefault();

                var purchase = this.Mapper.Map(purchaseDTO, purchaseDb);
                var result = await this.PurchaseService.FromDeliveredToDelivered(purchase!);

                var dtoResult = this.Mapper.Map<PurchaseDTO>(result);
                return dtoResult;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, status = 400 });
            }
        }
        #endregion

    }
}
