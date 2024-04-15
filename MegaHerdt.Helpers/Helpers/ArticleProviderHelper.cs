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


    }
}
