using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class PurchaseService : BaseService<Purchase>
    {
        PurchaseHelper purchaseHelper;
        public PurchaseService(PurchaseHelper purchaseHelper):
            base(purchaseHelper)
        {
            this.purchaseHelper = purchaseHelper;
        }

        public List<Purchase> GetClientPurchases(string clientId)
        {           
            Expression<Func<Purchase, bool>> filter = x => x.ClientId == clientId;
            return this.helper.Get(filter).ToList();           
        }

        public List<Purchase> GetByState(PurchaseState purchaseState)
        {
            Expression<Func<Purchase, bool>> filter = x => x.State == purchaseState;
            return this.helper.Get(filter).OrderByDescending(x => x.Date).ToList();
        }

        public async Task<Purchase> FromReservedToPaid(Purchase purchase, int paymentsQuantity)
        {
            return await this.purchaseHelper.FromReservedToPaid(purchase, paymentsQuantity);
        }

        public async Task<Purchase> FromReservedToCancelledReservation(Purchase purchase)
        {
            return await this.purchaseHelper.FromReservedToCancelledReservation(purchase);
        } 
        
        public async Task<Purchase> FromPaidToDelivered(Purchase purchase)
        {
            return await this.purchaseHelper.FromPaidToDelivered(purchase);
        } 
        
        public async Task<Purchase> FromDeliveredToDelivered(Purchase purchase)
        {
            return await this.purchaseHelper.FromDeliveredToDelivered(purchase);
        }
    }
}
