using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationClaimHelper: BaseHelper<ReparationClaim>
    {
        private readonly Repository<Reparation> repositoryReparation;
        public ReparationClaimHelper(Repository<ReparationClaim> repository, Repository<Reparation> repositoryReparation):
            base(repository)
        {
            this.repositoryReparation = repositoryReparation;
        }

        public override async Task<ReparationClaim> Create(ReparationClaim reparationClaim)
        {
            if (validateReparationData(reparationClaim))
            {
                return await this.repository.Add(reparationClaim);
            }
            else { throw new Exception("reparation credentials are invalids"); }

        }

        public override async Task Update(ReparationClaim reparationClaim)
        {
            if (validateReparationData(reparationClaim))
            {
                await this.repository.Update(reparationClaim);
            }
            else { throw new Exception("reparation credentials are invalids"); }
        }

        public override async Task Delete(ReparationClaim reparationClaim)
        {
            if (validateReparationData(reparationClaim))
            {
                await this.repository.Delete(reparationClaim);
            }
        }

        public override IQueryable<ReparationClaim> Get(Expression<Func<ReparationClaim, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Reparation)
                .ThenInclude(x => x.ReparationState)
                .Include(x => x.Reparation)
                .ThenInclude(x => x.Employee)
                .Include(x => x.Reparation)
                .ThenInclude(x => x.Bill)
                .Include(x => x.Reparation)
                .ThenInclude(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .OrderByDescending(x => x.Date);
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
