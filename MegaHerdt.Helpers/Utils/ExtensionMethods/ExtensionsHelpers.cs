using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.IncomeExpensesData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Helpers.Utils.ExtensionMethods
{
    public static class ExtensionsHelpers
    {
        public static void SetArticles(this IncomeExpenses incomeExpenses, Reparation reparation)
        {
            foreach (var reparationArticle in reparation.ReparationsArticles)
            {
                incomeExpenses.Articles.Add(new ArticleDetail()
                {
                    Name = reparationArticle.Article.Name,
                    Quantity = reparationArticle.ArticleQuantity,
                    PriceAtTheMoment = reparationArticle.ArticlePriceAtTheMoment
                });
            }
        }

        public static void SetClientDetails(this IncomeExpenses incomeExpenses, Reparation reparation)
        {
            incomeExpenses.Client = new ClientDetail()
            {
                Name = reparation.Client.Name,
                Surname = reparation.Client.Surname,
                Dni = reparation.Client.Dni
            };
        }

        public static void SetArticles(this IncomeExpenses incomeExpenses, Purchase purchase)
        {
            foreach (var purchaseArticle in purchase.PurchasesArticles)
            {
                incomeExpenses.Articles.Add(new ArticleDetail()
                {
                    Name = purchaseArticle.Article.Name,
                    Quantity = purchaseArticle.ArticleQuantity,
                    PriceAtTheMoment = purchaseArticle.ArticlePriceAtTheMoment
                });
            }
        }

        public static void SetClientDetails(this IncomeExpenses incomeExpenses, Purchase purchase)
        {
            incomeExpenses.Client = new ClientDetail()
            {
                Name = purchase.Client.Name,
                Surname = purchase.Client.Surname,
                Dni = purchase.Client.Dni
            };
        }
    }
}

