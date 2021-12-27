using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
