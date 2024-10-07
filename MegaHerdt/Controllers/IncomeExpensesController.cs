using AutoMapper;
using MegaHerdt.API.DTOs.IncomeExpenses;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeExpensesController : ControllerBase
    {
        private readonly IncomeExpensesService incomeExpensesService;
        private readonly IMapper mapper;
        public IncomeExpensesController(IncomeExpensesService incomeExpensesService, IMapper mapper)
        {
            this.incomeExpensesService = incomeExpensesService;
            this.mapper = mapper;
        }

        [HttpGet("get-reparations-income/{startDate}/{endDate}")]
        public IActionResult GetReparationsIncome(DateTime? startDate = null, DateTime? endDate = null)
        {
            try
            {
                var incomesExpenses = this.incomeExpensesService.GetReparationsIncome(startDate, endDate);
                var total = this.incomeExpensesService.GetTotalIncomeExpenses(incomesExpenses);
                var detailIncomeExpenses = new DetailsIncomeExpensesDTO { Total = total };

                detailIncomeExpenses.IncomeExpenses = this.mapper.Map<List<IncomeExpensesDTO>>(incomesExpenses);

                return Ok(detailIncomeExpenses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-purchases-income/{startDate}/{endDate}")]
        public IActionResult GetPurchasesIncome(DateTime? startDate = null, DateTime? endDate = null)
        {
            try
            {
                var incomesExpenses = this.incomeExpensesService.GetPurchasesIncome(startDate, endDate);
                var total = this.incomeExpensesService.GetTotalIncomeExpenses(incomesExpenses);
                var detailIncomeExpenses = new DetailsIncomeExpensesDTO { Total = total };

                detailIncomeExpenses.IncomeExpenses = this.mapper.Map<List<IncomeExpensesDTO>>(incomesExpenses);
                return Ok(detailIncomeExpenses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
