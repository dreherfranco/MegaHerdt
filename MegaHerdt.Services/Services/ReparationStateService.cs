using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ReparationStateService: BaseService<ReparationState>
    {
        public ReparationStateService(ReparationStateHelper reparationStateHelper):
            base(reparationStateHelper)
        {
           
        }

        public ReparationState GetById(int reparationStateId)
        {
            Expression<Func<ReparationState, bool>> filter = x => x.Id == reparationStateId;
            return this.helper.Get(filter).FirstOrDefault();
        }
    }
}
