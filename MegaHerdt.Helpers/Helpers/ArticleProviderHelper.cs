using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
                .Include(x => x.Article)
                .Include(x => x.SerialNumbers)
                .OrderByDescending(x => x.ProvisionDate);
        }
     
    }
}
