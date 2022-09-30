using MegaHerdt.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Helpers.Utils
{
    public static class IncomeExpensesPurchasesUtils
    {
        public static float GetIncomeYearly(List<Purchase> purchases, int year)
        {
            float totalIncome = 0;
            foreach (var purchase in purchases)
            {
                if (purchase.Bill != null && purchase.Bill.Payments.Count != 0)
                {
                    foreach (var payment in purchase.Bill.Payments)
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

        public static float GetIncomeMonthly(List<Purchase> purchases, int year, int month)
        {
            float totalIncome = 0;
            foreach (var purchase in purchases)
            {
                if (purchase.Bill != null && purchase.Bill.Payments.Count != 0)
                {
                    foreach (var payment in purchase.Bill.Payments)
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

        public static float GetIncomeDaily(List<Purchase> purchases, int year, int month, int day)
        {
            float totalIncome = 0;
            foreach (var purchase in purchases)
            {
                if (purchase.Bill != null && purchase.Bill.Payments.Count != 0)
                {
                    foreach (var payment in purchase.Bill.Payments)
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
