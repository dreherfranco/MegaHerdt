using AutoMapper;
using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.Utils;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
