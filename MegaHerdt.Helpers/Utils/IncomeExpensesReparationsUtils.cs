using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Helpers.Utils
{
    public static class IncomeExpensesReparationsUtils
    {
        public static List<ReparationIncomeExpenses> GetIncomeYearly(List<Reparation> reparations, int year)
        {
            var listIncomeExpenses = new List<ReparationIncomeExpenses>();
            
            foreach (var reparation in reparations)
            {
                var band = true;
                var incomeExpenses = new ReparationIncomeExpenses();
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

        public static List<ReparationIncomeExpenses> GetIncomeMonthly(List<Reparation> reparations, int year, int month)
        {      
            var listIncomeExpenses = new List<ReparationIncomeExpenses>();

            foreach (var reparation in reparations)
            {
                var incomeExpenses = new ReparationIncomeExpenses();
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

        public static List<ReparationIncomeExpenses> GetIncomeDaily(List<Reparation> reparations, int year, int month, int day)
        {
            var listIncomeExpenses = new List<ReparationIncomeExpenses>();        

            foreach (var reparation in reparations)
            {
                var incomeExpenses = new ReparationIncomeExpenses();
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

        private static void SetArticles(this ReparationIncomeExpenses reparationIncomeExpenses,Reparation reparation)
        {
            foreach(var reparationArticle in reparation.ReparationsArticles)
            {
                reparationIncomeExpenses.Articles.Add(new ArticleDetail()
                {
                    Name = reparationArticle.Article.Name,
                    Quantity = reparationArticle.ArticleQuantity,
                    PriceAtTheMoment = reparationArticle.ArticlePriceAtTheMoment
                });
            }
        }

        private static void SetClientDetails(this ReparationIncomeExpenses reparationIncomeExpenses, Reparation reparation)
        {
              reparationIncomeExpenses.Client = new ClientDetail()
              {
                  Name = reparation.Client.Name,
                  Surname = reparation.Client.Surname,
                  Dni = reparation.Client.Dni
              };
            }
        }
    }
