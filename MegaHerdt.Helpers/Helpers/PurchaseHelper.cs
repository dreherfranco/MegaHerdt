using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace MegaHerdt.Helpers.Helpers
{
    public class PurchaseHelper: BaseHelper<Purchase>
    {
        public PurchaseHelper(Repository<Purchase> repository):
            base(repository)
        {
        }

        public override IQueryable<Purchase> Get(Expression<Func<Purchase, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x=> x.PurchasesClaims)
                .Include(x => x.PurchasesArticles)
                    .ThenInclude(x => x.Article)
                .Include(x => x.PurchasesArticles)
                    .ThenInclude(x => x.SerialNumbers)
                .Include(x => x.Shipment)
                    .ThenInclude(x => x.Address)
                .Include(x => x.Shipment)
                    .ThenInclude(x => x.TransportCompany)
                .Include(x => x.Bill)
                    .ThenInclude(x => x.Payments)
                .OrderByDescending(x => x.Date);
        }

    }
}
