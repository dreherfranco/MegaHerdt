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
    public class ArticleOfferHelper: BaseHelper<ArticleOffer>
    {
        public ArticleOfferHelper(Repository<ArticleOffer> repository):
            base(repository)
        {

        }

        public override IQueryable<ArticleOffer> Get(Expression<Func<ArticleOffer, bool>> filter = null)
        {
            return repository.Get(filter)
                    .Include(x => x.Article);
            //   .Include(x => x.ArticlesPro;viders)
            //  .ThenInclude(x => x.Provider);
        }
    }
}
