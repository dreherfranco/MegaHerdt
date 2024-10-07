
using MegaHerdt.Helpers.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;

namespace MegaHerdt.Helpers.Helpers
{
    public class IncomeExpensesHelper
    {
        private readonly Repository<Reparation> reparationRepository;
        private readonly Repository<Purchase> purchaseRepository;
        public IncomeExpensesHelper(Repository<Reparation> reparationRepository, Repository<Purchase> purchaseRepository)
        {
            this.reparationRepository = reparationRepository;
            this.purchaseRepository = purchaseRepository;
        }

        public List<IncomeExpenses> GetReparationsIncome(DateTime? startDate, DateTime? endDate)
        {
            var reparations = this.reparationRepository
                .Get()
                .Include(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .Include(x => x.Bill)
                .ThenInclude(x => x.Payments)
                .Include(x => x.Client)
                .ToList();

            if (startDate.HasValue && endDate.HasValue)
            {
                return IncomeExpensesReparationsUtils.GetIncomeInRange(reparations, startDate.Value, endDate.Value);
            }

            // Si no se proporcionan fechas, retorna ingresos del mes actual
            var currentMonthStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
            var currentMonthEnd = currentMonthStart.AddMonths(1).AddDays(-1);
            return IncomeExpensesReparationsUtils.GetIncomeInRange(reparations, currentMonthStart, currentMonthEnd);
        }

        public List<IncomeExpenses> GetPurchasesIncome(DateTime? startDate, DateTime? endDate)
        {
            var purchases = this.purchaseRepository
                .Get()
                .Include(x => x.Bill)
                .ThenInclude(x => x.Payments)
                .Include(x => x.PurchasesArticles)
                .ThenInclude(x => x.Article)
                .Include(x => x.Client)
                .ToList();

            // Filtrar por fechas
            return IncomeExpensesPurchasesUtils.GetIncomeInRange(purchases, startDate, endDate);
        }

    }
}
