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
                .Include(x => x.PurchasesArticles)
                .ThenInclude(x => x.Article)
                .Include(x => x.Shipment)
                .ThenInclude(x => x.Address)
                .Include(x => x.Shipment)
                .ThenInclude(x => x.TransportCompany)
                .OrderByDescending(x => x.Date);
        }

    }
}
