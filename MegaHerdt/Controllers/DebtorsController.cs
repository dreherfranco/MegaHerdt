using AutoMapper;
using MegaHerdt.API.DTOs.Debts;
using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.DTOs.Reparation;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DebtorsController : ControllerBase
    {
        private readonly DebtorsService debtorsService;
        private readonly IMapper mapper;
        public DebtorsController(DebtorsService debtorsService, IMapper mapper)
        {
            this.debtorsService = debtorsService;
            this.mapper = mapper;
        }

        [HttpGet("get-all")]
        public ActionResult<DebtsDTO> Get()
        {
            try
            {
                var purchaseDebtsDTO = this.mapper.Map<List<PurchaseDebtDTO>>(debtorsService.GetAllPurchaseDebts());
                var reparationDebtsDTO = this.mapper.Map<List<ReparationDebtDTO>>(debtorsService.GetAllReparationDebts());
                return new DebtsDTO() 
                {
                    PurchaseDebts = purchaseDebtsDTO, 
                    ReparationDebts = reparationDebtsDTO 
                };
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
