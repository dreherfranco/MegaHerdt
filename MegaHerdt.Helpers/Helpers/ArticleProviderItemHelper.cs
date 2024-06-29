using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ArticleProviderItemHelper : BaseHelper<ArticleProviderItem>
    {
        public ArticleProviderItemHelper(Repository<ArticleProviderItem> repository):
            base(repository)
        {
            
        }

        public override IQueryable<ArticleProviderItem> Get(Expression<Func<ArticleProviderItem, bool>> filter = null)
        {
            return repository.Get(filter).Include(i => i.SerialNumbers);
        }

        public IQueryable<ArticleProviderSerialNumber> GetSerialNumbersByArticleId(int articleId, bool? enStock = null)
        {
            
            var serialNumbers = Get(i => i.ArticleId == articleId).SelectMany(i => i.SerialNumbers!);
            
            // Si se desea filtrar por stock.
            if (enStock is not null)
            {
                // Trae los que solo estan en stock
                if (enStock.Value)
                {
                    serialNumbers = serialNumbers.Where(sn => sn.EnStock);
                }
                // Trae los que no estan en stock
                else
                {
                    serialNumbers = serialNumbers.Where(sn => !sn.EnStock);
                }
            }
            return serialNumbers;
        }

    }
}
