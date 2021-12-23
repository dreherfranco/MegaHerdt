using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationStateHelper
    {
        private readonly Repository<ReparationState> repository;

        public ReparationStateHelper(Repository<ReparationState> repository)
        {
            this.repository = repository;
        }

        public async Task<ReparationState> Create(ReparationState reparationClaim)
        {
            return await this.repository.Add(reparationClaim);
        }

        public async Task Update(ReparationState reparationClaim)
        {
                await this.repository.Update(reparationClaim);
        }

        public async Task Delete(ReparationState reparationClaim)
        {
                await this.repository.Delete(reparationClaim);
        }

        public IQueryable<ReparationState> Get(Expression<Func<ReparationState, bool>> filter = null)
        {
            return repository.Get(filter);
        }
    }
}
