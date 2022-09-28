using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.DTOs.Reparation;

namespace MegaHerdt.API.DTOs.Debts
{
    public class DebtsDTO
    {
        public List<PurchaseDebtDTO> PurchaseDebts { get; set; }
        public List<ReparationDebtDTO> ReparationDebts { get; set; }
    }
}
