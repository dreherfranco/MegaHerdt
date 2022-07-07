using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ReparationService: BaseService<Reparation>
    {
        ReparationHelper reparationHelper;
        public ReparationService(ReparationHelper helper):
            base(helper)
        {
            this.reparationHelper = helper;   
        }

        public Reparation GetReparationById(int reparationId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationId;
            return this.helper.Get(filter).FirstOrDefault();
        }

        public IQueryable<Reparation> GetReparationByStateId(int reparationStateId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.ReparationStateId == reparationStateId;
            return this.helper.Get(filter);
        }

        public List<Reparation> GetClientReparations(string clientId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.ClientId == clientId;
            return this.helper.Get(filter).ToList();
        }

        public List<Reparation> GetEmployeeReparations(string employeeId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.EmployeeId == employeeId;
            return this.helper.Get(filter).ToList();
        }
        
        public bool isInBudget(string reparationStateName)
        {
            return reparationStateName.Contains("PRESUPUESTO");
        }

        public async Task UpdateBudget(Reparation reparation, bool isAccepted)
        {
            await this.reparationHelper.UpdateBudget(reparation, isAccepted);
        }

        public MailRequest mailRequest(Reparation reparation)
        {
            return new MailRequest()
            {
                ToEmail = reparation.Client.Email,
                Subject = "ESTADO DE REPARACION",
                Body = "El presupuesto de su reparacion está listo, su costo es de $" + reparation.Amount
            };
        }
    }
}
