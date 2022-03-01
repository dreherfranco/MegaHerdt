using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class PurchaseService : BaseService<Purchase>
    {
        public PurchaseService(PurchaseHelper purchaseHelper):
            base(purchaseHelper)
        {

        }

        public List<Purchase> GetClientPurchases(string clientId)
        {           
            Expression<Func<Purchase, bool>> filter = x => x.ClientId == clientId;
            return this.helper.Get(filter).ToList();           
        }
    }
}
