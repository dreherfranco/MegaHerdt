using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MegaHerdt.Helpers.Utils.ExtensionMethods;

namespace MegaHerdt.Helpers.Utils
{
    public static class IncomeExpensesReparationsUtils
    {
        public static List<IncomeExpenses> GetIncomeYearly(List<Reparation> reparations, int year)
        {
            var listIncomeExpenses = new List<IncomeExpenses>();

            foreach (var reparation in reparations)
            {
                var band = true;
                var incomeExpenses = new IncomeExpenses();
                if (reparation.Bill != null && reparation.Bill.Payments.Count != 0)
                {
                    foreach (var payment in reparation.Bill.Payments)
                    {
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month <= actualMonth)
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

        public static List<IncomeExpenses> GetIncomeMonthly(List<Reparation> reparations, int year, int month)
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
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month == month)
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

        public static List<IncomeExpenses> GetIncomeDaily(List<Reparation> reparations, int year, int month, int day)
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
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month == month && payment.PaymentDate.Day == day)
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
