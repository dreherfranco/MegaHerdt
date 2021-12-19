using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationHelper
    {
        private readonly Repository<Reparation> repository;
        public ReparationHelper(Repository<Reparation> repository)
        {
            this.repository = repository;
        }

        public async Task<Reparation> CreateReparation(Reparation reparation)
        {
            return await this.repository.Add(reparation);
        }

        public IQueryable<Reparation> GetClientReparations(Expression<Func<Reparation, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Employee)
                .Include(x => x.ReparationState);
        }
    }
}
