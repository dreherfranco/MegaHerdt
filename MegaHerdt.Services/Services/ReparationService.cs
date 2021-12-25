using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ReparationService: BaseService<Reparation>
    {
        public ReparationService(ReparationHelper reparationHelper):
            base(reparationHelper)
        {
            
        }

        public Reparation GetReparationById(int reparationId)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationId;
            return this.helper.Get(filter).FirstOrDefault();
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
        
    }
}
