using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ReparationService
    {
        private readonly ReparationHelper reparationHelper;
        public ReparationService(ReparationHelper reparationHelper)
        {
            this.reparationHelper = reparationHelper;
        }

        public async Task<Reparation> CreateReparation(Reparation reparation)
        {
            return await this.reparationHelper.CreateReparation(reparation);
        }

        public List<Reparation> GetClientReparations(string clientId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.ClientId == clientId;
            return this.reparationHelper.GetClientReparations(filter).ToList();
        }
    }
}
