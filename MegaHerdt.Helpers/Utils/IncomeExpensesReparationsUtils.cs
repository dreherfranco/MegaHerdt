using MegaHerdt.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Helpers.Utils
{
    public static class IncomeExpensesReparationsUtils
    {
        public static float GetIncomeYearly(List<Reparation> reparations, int year)
        {
            float totalIncome = 0;
            foreach (var reparation in reparations)
            {
                if (reparation.Bill != null && reparation.Bill.Payments.Count != 0)
                {
                    foreach (var payment in reparation.Bill.Payments)
                    {
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month <= actualMonth)
                        {
                            totalIncome += payment.Amount;
                        }
                    }
                }
            }
            return totalIncome;
        }

        public static float GetIncomeMonthly(List<Reparation> reparations, int year, int month)
        {
            float totalIncome = 0;
            foreach (var reparation in reparations)
            {
                if (reparation.Bill != null && reparation.Bill.Payments.Count != 0)
                {
                    foreach (var payment in reparation.Bill.Payments)
                    {
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month == month)
                        {
                            totalIncome += payment.Amount;
                        }
                    }
                }
            }
            return totalIncome;
        }

        public static float GetIncomeDaily(List<Reparation> reparations, int year, int month, int day)
        {
            float totalIncome = 0;
            foreach (var reparation in reparations)
            {
                if (reparation.Bill != null && reparation.Bill.Payments.Count != 0)
                {
                    foreach (var payment in reparation.Bill.Payments)
                    {
                        var actualMonth = DateTime.UtcNow.Month;
                        if (payment.PaymentDate.Year == year && payment.PaymentDate.Month == month && payment.PaymentDate.Day == day)
                        {
                            totalIncome += payment.Amount;
                        }
                    }
                }
            }
            return totalIncome;
        }
    }
}
