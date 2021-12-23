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
        private readonly Repository<Reparation> repositoryReparation;
        public ReparationClaimHelper(Repository<ReparationClaim> repository, Repository<Reparation> repositoryReparation)
        {
            this.repository = repository;
            this.repositoryReparation = repositoryReparation;
        }

        public async Task<ReparationClaim> Create(ReparationClaim reparationClaim)
        {
            if (validateReparationData(reparationClaim))
            {
                return await this.repository.Add(reparationClaim);
            }
            else { throw new Exception("reparation credentials are invalids"); }

        }

        public async Task Update(ReparationClaim reparationClaim)
        {
            if (validateReparationData(reparationClaim))
            {
                await this.repository.Update(reparationClaim);
            }
            else { throw new Exception("reparation credentials are invalids"); }
        }

        public async Task Delete(ReparationClaim reparationClaim)
        {
            if (validateReparationData(reparationClaim))
            {
                await this.repository.Delete(reparationClaim);
            }
        }

        public IQueryable<ReparationClaim> Get(Expression<Func<ReparationClaim, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Reparation)
                .ThenInclude(x => x.Employee);
        }


        private bool validateReparationData(ReparationClaim reparationClaim)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationClaim.ReparationId;
            var reparation = repositoryReparation.Get(filter).FirstOrDefault();
            var validClient = reparation != null && reparation.ClientId == reparationClaim.ClientId;
            return validClient;
        }
    }
}
