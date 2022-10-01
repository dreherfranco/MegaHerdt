
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

        public List<IncomeExpenses> GetReparationsIncome(int year, int month, int day)
        {
            var reparations = this.reparationRepository
                .Get()
                .Include(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .Include(x => x.Bill)
                .ThenInclude(x => x.Payments)
                .Include(x => x.Client)
                .ToList();

            if (month == 0 && day == 0)
            {
                return IncomeExpensesReparationsUtils.GetIncomeYearly(reparations, year);
            }
            else if(day == 0)
            {
                return IncomeExpensesReparationsUtils.GetIncomeMonthly(reparations, year, month);
            }

            return IncomeExpensesReparationsUtils.GetIncomeDaily(reparations, year, month, day);
        }

        public List<IncomeExpenses> GetPurchasesIncome(int year, int month, int day)
        {
            var purchases = this.purchaseRepository
                .Get()
                .Include(x => x.Bill)
                .ThenInclude(x => x.Payments)
                .Include(x => x.PurchasesArticles)
                .ThenInclude(x => x.Article)
                .Include(x => x.Client)
                .ToList();
            
            if (month == 0 && day == 0)
            {
                return IncomeExpensesPurchasesUtils.GetIncomeYearly(purchases, year);
            }
            else if (day == 0)
            {
                return IncomeExpensesPurchasesUtils.GetIncomeMonthly(purchases, year, month);
            }

            return IncomeExpensesPurchasesUtils.GetIncomeDaily(purchases, year, month, day);
        }

    }
}
