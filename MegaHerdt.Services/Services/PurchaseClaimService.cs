using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class PurchaseClaimService : BaseService<PurchaseClaim>
    {
        public PurchaseClaimService(PurchaseClaimHelper purchaseClaimHelper) :
            base(purchaseClaimHelper)
        {
        }

        public List<PurchaseClaim> GetByClientId(string clientId)
        {
            Expression<Func<PurchaseClaim, bool>> filter = x => x.ClientId == clientId;
            return this.helper.Get(filter).ToList();
        }
    }
}
