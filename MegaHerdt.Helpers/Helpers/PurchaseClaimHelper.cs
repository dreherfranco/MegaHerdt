using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class PurchaseClaimHelper : BaseHelper<PurchaseClaim>
    {
        private readonly Repository<Purchase> repositoryPurchase;
        public PurchaseClaimHelper(Repository<PurchaseClaim> repository, Repository<Purchase> repositoryPurchase) :
            base(repository)
        {
            this.repositoryPurchase = repositoryPurchase;
        }
        public override async Task<PurchaseClaim> Create(PurchaseClaim purchaseClaim)
        {
            if (validatePurchaseData(purchaseClaim))
            {
                return await this.repository.Add(purchaseClaim);
            }
            else { throw new Exception("purchase credentials are invalids"); }

        }

        public override async Task Update(PurchaseClaim purchaseClaim)
        {
            if (validatePurchaseData(purchaseClaim))
            {
                await this.repository.Update(purchaseClaim);
            }
            else { throw new Exception("purchase credentials are invalids"); }
        }

        public override async Task Delete(PurchaseClaim purchaseClaim)
        {
            if (validatePurchaseData(purchaseClaim))
            {
                await this.repository.Delete(purchaseClaim);
            }
        }

        public override IQueryable<PurchaseClaim> Get(Expression<Func<PurchaseClaim, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .OrderByDescending(x => x.Date);
        }


        private bool validatePurchaseData(PurchaseClaim purchaseClaim)
        {
            Expression<Func<Purchase, bool>> filter = x => x.Id == purchaseClaim.PurchaseId;
            var purchase = repositoryPurchase.Get(filter).FirstOrDefault();
            var validClient = purchase != null && purchase.ClientId == purchaseClaim.ClientId;
            return validClient;
        }
    }
}
