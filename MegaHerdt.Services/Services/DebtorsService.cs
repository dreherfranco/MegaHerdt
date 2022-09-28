

using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;

namespace MegaHerdt.Services.Services
{
    public class DebtorsService
    {
        private readonly DebtorsHelper debtorsHelper;
        public DebtorsService(DebtorsHelper debtorsHelper)
        {
            this.debtorsHelper = debtorsHelper;
        }

       public List<Purchase> GetAllPurchaseDebts()
        {
            return this.debtorsHelper.GetAllPurchaseDebts();
        }

        public List<Reparation> GetAllReparationDebts()
        {
            return this.debtorsHelper.GetAllReparationDebts();
        }
    }
}
