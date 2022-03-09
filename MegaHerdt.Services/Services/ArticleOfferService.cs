using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ArticleOfferService : BaseService<ArticleOffer>
    {
        public ArticleOfferService(ArticleOfferHelper helper) :
            base(helper)
        {

        }

        public bool IsValid(ArticleOffer offer)
        {
            if(offer.StartDate < offer.EndDate && offer.ArticleId != 0)
            {
                return true;
            }
            return false;
        }
    }
}
