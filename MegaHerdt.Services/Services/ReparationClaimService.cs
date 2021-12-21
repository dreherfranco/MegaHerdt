using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ReparationClaimService
    {
        private readonly ReparationClaimHelper reparationClaimHelper;
        public ReparationClaimService(ReparationClaimHelper reparationClaimHelper)
        {
            this.reparationClaimHelper = reparationClaimHelper;
        }

        public async Task<ReparationClaim> Create(ReparationClaim reparationClaim)
        {
            return await this.reparationClaimHelper.Create(reparationClaim);
        }

        public async Task Update(ReparationClaim reparationClaim)
        {
            await this.reparationClaimHelper.Update(reparationClaim);
        }

        public async Task Delete(ReparationClaim reparationClaim)
        {
            await this.reparationClaimHelper.Delete(reparationClaim);
        }

        public List<ReparationClaim> GetAll()
        {
            return this.reparationClaimHelper.Get().ToList();
        }
        public List<ReparationClaim> GetByClientId(string clientId)
        {
            Expression<Func<ReparationClaim, bool>> filter = x => x.ClientId == clientId;
            return this.reparationClaimHelper.Get(filter).ToList();
        }

        public ReparationClaim GetById(int reparationClaimId)
        {
            Expression<Func<ReparationClaim, bool>> filter = x => x.Id == reparationClaimId;
            return this.reparationClaimHelper.Get(filter).FirstOrDefault();
        }


    }
}
