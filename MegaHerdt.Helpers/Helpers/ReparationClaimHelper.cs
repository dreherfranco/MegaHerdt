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
    public class ReparationClaimHelper
    {
        private readonly Repository<ReparationClaim> repository;
        public ReparationClaimHelper(Repository<ReparationClaim> repository)
        {
            this.repository = repository;
        }

        public async Task<ReparationClaim> Create(ReparationClaim reparationClaim)
        {
            return await this.repository.Add(reparationClaim);
        }

        public async Task Update(ReparationClaim reparationClaim)
        {
            await this.repository.Update(reparationClaim);
        }

        public async Task Delete(ReparationClaim reparationClaim)
        {
            await this.repository.Delete(reparationClaim);
        }

        public IQueryable<ReparationClaim> Get(Expression<Func<ReparationClaim, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Reparation);
        }

    }
}
