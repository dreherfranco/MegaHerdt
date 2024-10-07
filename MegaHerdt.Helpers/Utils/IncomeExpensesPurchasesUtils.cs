using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;
using MegaHerdt.Helpers.Utils.ExtensionMethods;

namespace MegaHerdt.Helpers.Utils
{

    public static class IncomeExpensesPurchasesUtils
    {
        public static List<IncomeExpenses> GetIncomeInRange(List<Purchase> purchases, DateTime? startDate, DateTime? endDate)
        {
            var listIncomeExpenses = new List<IncomeExpenses>();

            foreach (var purchase in purchases)
            {
                var incomeExpenses = new IncomeExpenses();
                var band = true;

                if (purchase.Bill != null && purchase.Bill.Payments.Count != 0)
                {
                    foreach (var payment in purchase.Bill.Payments)
                    {
                        // Verificar si la fecha del pago está dentro del rango
                        if (IsPaymentInRange(payment.PaymentDate, startDate, endDate))
                        {
                            if (band)
                            {
                                incomeExpenses.SetArticles(purchase);
                                incomeExpenses.SetClientDetails(purchase);
                            }
                            band = false;
                            incomeExpenses.PaymentsMade++;
                            incomeExpenses.TotalIncomePaidByReparation += payment.Amount;
                        }
                    }
                    if (!band)
                    {
                        incomeExpenses.TotalPayments = purchase.Bill.Payments.Count;
                        listIncomeExpenses.Add(incomeExpenses);
                    }
                }
            }

            return listIncomeExpenses;
        }

        // Método auxiliar para verificar si el pago está dentro del rango de fechas
        private static bool IsPaymentInRange(DateTime paymentDate, DateTime? startDate, DateTime? endDate)
        {
            if (startDate.HasValue && paymentDate < startDate.Value)
            {
                return false;
            }
            if (endDate.HasValue && paymentDate > endDate.Value)
            {
                return false;
            }
            return true;
        }
    }

}
