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

        [HttpGet("get-reparations-income/{year}/{month?}/{day?}")]
        public IActionResult GetReparationsIncome(int year=0, int month=0, int day=0)
        {
            try
            {
                var incomesExpenses = this.incomeExpensesService.GetReparationsIncome(year, month, day);
                var total = this.incomeExpensesService.GetTotalReparationIncomeExpenses(incomesExpenses);
                var detailIncomeExpenses = new DetailsReparationIncomeExpensesDTO { Total = total };
                detailIncomeExpenses.ReparationIncomeExpenses = this.mapper.Map<List<ReparationIncomeExpensesDTO>>(incomesExpenses);
                return Ok( detailIncomeExpenses );
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-purchases-income/{year}/{month?}/{day?}")]
        public IActionResult GetPurchasesIncome(int year = 0, int month = 0, int day = 0)
        {
            try
            {
                var incomes = this.incomeExpensesService.GetPurchasesIncome(year, month, day);
                return Ok(new { incomes });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
