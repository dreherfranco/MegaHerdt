using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ReparationService
    {
        private readonly Repository<Reparation> repository;
        public ReparationService(Repository<Reparation> repository)
        {
            this.repository = repository;
        }

        public async Task<Reparation> CreateReparation(Reparation reparation)
        {
            return await this.repository.Add(reparation);
        }
    }
}
