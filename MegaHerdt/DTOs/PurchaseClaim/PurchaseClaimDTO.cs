using MegaHerdt.API.DTOs.Purchase;

namespace MegaHerdt.API.DTOs.PurchaseClaim
{
    public class PurchaseClaimDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public bool Answered { get; set; }
        public PurchaseDTO Purchase { get; set; }
    }
}
