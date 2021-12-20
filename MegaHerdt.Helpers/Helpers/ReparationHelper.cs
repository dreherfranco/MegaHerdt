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

        public async Task UpdateReparation(Reparation reparation)
        {
            await this.repository.Update(reparation);
        }

        public async Task DeleteReparation(Reparation reparation)
        {
            await this.repository.Delete(reparation);
        }

        public IQueryable<Reparation> GetUserReparations(Expression<Func<Reparation, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Employee)
                .Include(x => x.ReparationState);
        }
    }
}
