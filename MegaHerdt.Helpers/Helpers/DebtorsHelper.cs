

using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;

namespace MegaHerdt.Helpers.Helpers
{
    public class DebtorsHelper
    {
        private readonly Repository<Purchase> purchaseRepository;
        private readonly Repository<Reparation> reparationRepository;
        public DebtorsHelper(Repository<Purchase> purchaseRepository, Repository<Reparation> reparationRepository)
        {
            this.purchaseRepository = purchaseRepository;
            this.reparationRepository = reparationRepository;
        }

        public List<Purchase> GetAllPurchaseDebts()
        {
            var purchaseDebts = this.purchaseRepository.Get()
                .Include(p => p.Client)
                .Include(p => p.Bill)
                .ThenInclude(b => b.Payments)
                .Include(p=>p.PurchasesArticles)
                .Where(p => p.Bill.Payments.Count == 0);

            return purchaseDebts.ToList();
        }

        public List<Reparation> GetAllReparationDebts()
        {
            var reparationDebts = this.reparationRepository.Get()
                .Include(r => r.Client)
                .Include(r => r.Bill)
                .ThenInclude(b => b.Payments)
                .Include(r => r.ReparationsArticles)
                .Where(r => r.Bill.Payments.Count == 0);

            return reparationDebts.ToList();
        }
    }
}
