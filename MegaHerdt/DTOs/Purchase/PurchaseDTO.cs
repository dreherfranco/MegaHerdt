using MegaHerdt.API.DTOs.PurchaseArticle;
using MegaHerdt.API.DTOs.PurchaseClaim;
using MegaHerdt.API.DTOs.Shipment;
using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.Purchase
{
    public class PurchaseDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public UserDetailDTO Client { get; set; }
        public ShipmentDTO? Shipment { get; set; }
        public List<PurchaseArticleDTO> PurchasesArticles { get; set; }
        public List<PurchaseClaimDetailDTO> PurchasesClaims { get; set; }
    }
}
