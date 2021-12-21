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

        public async Task UpdateReparation(Reparation reparation)
        {
            await this.reparationHelper.UpdateReparation(reparation);
        }

        public async Task DeleteReparation(Reparation reparation)
        {
            await this.reparationHelper.DeleteReparation(reparation);
        }

        public List<Reparation> GetAll()
        {
            return this.reparationHelper.GetUserReparations().ToList();
        }

        public Reparation GetReparationById(int reparationId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationId;
            return this.reparationHelper.GetUserReparations(filter).FirstOrDefault();
        }

        public List<Reparation> GetClientReparations(string clientId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.ClientId == clientId;
            return this.reparationHelper.GetUserReparations(filter).ToList();
        }

        public List<Reparation> GetEmployeeReparations(string employeeId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.EmployeeId == employeeId;
            return this.reparationHelper.GetUserReparations(filter).ToList();
        }
        
    }
}
