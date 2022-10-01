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

        public List<IncomeExpenses> GetReparationsIncome(int year, int month, int day)
        {
            return _helper.GetReparationsIncome(year, month, day);
        }

        public List<IncomeExpenses> GetPurchasesIncome(int year, int month, int day)
        {
            return _helper.GetPurchasesIncome(year, month, day);
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
