using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;

namespace MegaHerdt.Services.Services
{
    public class ArticleOfferService : BaseService<ArticleOffer>
    {
        public ArticleOfferService(ArticleOfferHelper helper) :
            base(helper)
        {

        }
    }
}
