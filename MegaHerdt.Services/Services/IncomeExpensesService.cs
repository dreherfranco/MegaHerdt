using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.IncomeExpensesData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class IncomeExpensesService
    {
        private readonly IncomeExpensesHelper _helper;
        public IncomeExpensesService(IncomeExpensesHelper helper)
        {
            this._helper = helper;
        }

        public List<IncomeExpenses> GetReparationsIncome(DateTime? startDate, DateTime? endDate)
        {
            return _helper.GetReparationsIncome(startDate, endDate);
        }

        public List<IncomeExpenses> GetPurchasesIncome(DateTime? startDate, DateTime? endDate)
        {
            return _helper.GetPurchasesIncome(startDate, endDate);
        }

        public float GetTotalIncomeExpenses(List<IncomeExpenses> listIncomeExpenses)
        {
            float total = 0;
            foreach(var incomeExpenses in listIncomeExpenses)
            {
                total += incomeExpenses.TotalIncomePaidByReparation;
            }
            return total;
        }
    }
}
