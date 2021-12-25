using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationHelper: BaseHelper<Reparation>
    {
        public ReparationHelper(Repository<Reparation> repository):
            base(repository)
        {
           
        }

        public override IQueryable<Reparation> Get(Expression<Func<Reparation, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Employee)
                .Include(x => x.ReparationState);
        }
    }
}
