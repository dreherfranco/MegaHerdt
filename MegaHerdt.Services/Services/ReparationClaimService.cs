using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ReparationClaimService: BaseService<ReparationClaim>
    {
        public ReparationClaimService(ReparationClaimHelper reparationClaimHelper):
            base(reparationClaimHelper)
        {
        }

        public List<ReparationClaim> GetByClientId(string clientId)
        {
            Expression<Func<ReparationClaim, bool>> filter = x => x.ClientId == clientId;
            return this.helper.Get(filter).ToList();
        }


    }
}
