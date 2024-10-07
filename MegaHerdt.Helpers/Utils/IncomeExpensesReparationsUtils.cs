using MegaHerdt.Helpers.Utils.ExtensionMethods;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;

namespace MegaHerdt.Helpers.Utils
{
    public static class IncomeExpensesReparationsUtils
    {
        public static List<IncomeExpenses> GetIncomeInRange(List<Reparation> reparations, DateTime startDate, DateTime endDate)
        {
            var listIncomeExpenses = new List<IncomeExpenses>();

            foreach (var reparation in reparations)
            {
                var incomeExpenses = new IncomeExpenses();
                var band = true;

                if (reparation.Bill != null && reparation.Bill.Payments.Count != 0)
                {
                    foreach (var payment in reparation.Bill.Payments)
                    {
                        if (payment.PaymentDate >= startDate && payment.PaymentDate <= endDate)
                        {
                            if (band)
                            {
                                incomeExpenses.SetArticles(reparation);
                                incomeExpenses.Amount = reparation.Amount;
                                incomeExpenses.SetClientDetails(reparation);
                            }
                            band = false;
                            incomeExpenses.PaymentsMade++;
                            incomeExpenses.TotalIncomePaidByReparation += payment.Amount;
                        }
                    }
                    if (!band)
                    {
                        incomeExpenses.TotalPayments = reparation.Bill.Payments.Count;
                        listIncomeExpenses.Add(incomeExpenses);
                    }
                }
            }

            return listIncomeExpenses;
        }

      

    }
}
