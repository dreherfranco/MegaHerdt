using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ArticleProviderHelper: BaseHelper<ArticleProvider>
    {
        public ArticleProviderHelper(Repository<ArticleProvider> repository) :
            base(repository)
        {
        }

        public override IQueryable<ArticleProvider> Get(Expression<Func<ArticleProvider, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Provider)
                .Include(x => x.ArticlesItems)
                    .ThenInclude(x => x.SerialNumbers)
                .Include(x => x.ArticlesItems)
                    .ThenInclude(x => x.Article)
                .OrderByDescending(x => x.ProvisionDate);
        }

        public ArticleProvider CreateDiscountStockInstance(int articleId, int articleQuantity, string discountReason, List<string> serialNumbers)
        {
            List<ArticleProviderSerialNumber> serialNumbersToSave = new();
            foreach(var serialNumber in serialNumbers)
            {
                serialNumbersToSave.Add(new()
                { 
                    SerialNumber = serialNumber, 
                    EnStock=false, 
                    IsDiscountStockOperation=true 
                });
            }

            ArticleProvider articleProviderDiscount = new ArticleProvider(discountReason, DateTime.UtcNow,
               // Solo una instancia porque en el descuento de stock solo se toma un articulo con sus numeros de serie a descontar.
                new List< ArticleProviderItem>(){
                new ArticleProviderItem() 
                {
                    ArticleId = articleId,
                    ArticleQuantity = articleQuantity,
                    SerialNumbers = serialNumbersToSave
                }
               });
            return articleProviderDiscount;
        }

    }
}
