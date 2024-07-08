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
            return this.reparationHelper.Get(filter).FirstOrDefault();
        }

        public IQueryable<Reparation> GetReparationByStateId(int reparationStateId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.ReparationStateId == reparationStateId;
            return this.reparationHelper.Get(filter).Where(x => x.Enabled);
        }

        public List<Reparation> GetClientReparations(string clientId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.ClientId == clientId;
            return this.reparationHelper.Get(filter).ToList();
        }

        public List<Reparation> GetEmployeeReparations(string employeeId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.EmployeeId == employeeId;
            return this.reparationHelper.Get(filter).ToList();
        }
        
        public bool isInBudget(string reparationStateName)
        {
            return reparationStateName.Contains("PRESUPUESTO");
        }

        public async Task UpdateFromReparadoToPresupuesto(Reparation reparation, int installments, MethodOfPayment method)
        {
            await this.reparationHelper.UpdateFromReparadoToPresupuesto(reparation, installments, method);
        }

        public async Task UpdateBudget(Reparation reparation, bool isAccepted/*, DateTime approximateTime*/)
        {
            await this.reparationHelper.UpdateBudget(reparation, isAccepted/*, approximateTime*/);
        }

        public async Task UpdateDecrementState(Reparation reparation)
        {
            await this.reparationHelper.UpdateDecrementState(reparation);
        }

        public MailRequest mailRequest(Reparation reparation)
        {
            var total = reparation.Amount + reparation.TotalArticleAmount;
            return new MailRequest()
            {
                ToEmail = reparation.Client.Email,
                Subject = "<b>Reparacion MegaHerdt</b> ",
                Body = "<b>Su reparacion se encuentra en </b>" + reparation.ReparationState.Name +
                "<br>El presupuesto de su reparacion está listo, su costo total es de $" + total
            };
        }

        public IEnumerable<Reparation> GetEnabledsReparations()
        {
            return this.helper.Get().Where(x => x.Enabled);
        }
    }
}
