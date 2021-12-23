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
    public class ReparationStateService
    {
        private readonly ReparationStateHelper reparationStateHelper;
        public ReparationStateService(ReparationStateHelper reparationStateHelper)
        {
            this.reparationStateHelper = reparationStateHelper;
        }

        public async Task<ReparationState> Create(ReparationState reparationState)
        {
            return await this.reparationStateHelper.Create(reparationState);
        }

        public async Task Update(ReparationState reparationState)
        {
            await this.reparationStateHelper.Update(reparationState);
        }

        public async Task Delete(ReparationState reparationState)
        {
            await this.reparationStateHelper.Delete(reparationState);
        }

        public List<ReparationState> GetAll()
        {
            return this.reparationStateHelper.Get().ToList();
        }

        public ReparationState GetById(int reparationStateId)
        {
            Expression<Func<ReparationState, bool>> filter = x => x.Id == reparationStateId;
            return this.reparationStateHelper.Get(filter).FirstOrDefault();
        }
    }
}
