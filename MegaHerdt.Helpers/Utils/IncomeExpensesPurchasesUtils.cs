using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;
using MegaHerdt.Helpers.Utils.ExtensionMethods;

namespace MegaHerdt.Helpers.Utils
{
    public static class IncomeExpensesPurchasesUtils
    {
        public static List<IncomeExpenses> GetIncomeYearly(List<Purchase> purchases, int year)
        {
            var listIncomeExpenses = new List<IncomeExpenses>();

            foreach (var purchase in purchases)
            {
                var band = true;
                var incomeExpenses = new IncomeExpenses();
                if (purchase.Bill != null && purchase.Bill.Payments.Count != 0)
                {
                    foreach (var payment in purchase.Bill.Payments)
                    {
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month <= actualMonth)
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

        public static List<IncomeExpenses> GetIncomeMonthly(List<Purchase> purchases, int year, int month)
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
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month == month)
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

        public static List<IncomeExpenses> GetIncomeDaily(List<Purchase> purchases, int year, int month, int day)
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
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month == month && payment.PaymentDate.Day == day)
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
    }
}
