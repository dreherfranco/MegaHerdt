using MegaHerdt.API.DTOs.PurchaseArticle;

namespace MegaHerdt.API.DTOs.PurchasePayment
{
    public class PurchasePaymentConfirmDTO
    {
        public string StripeToken { get; set; }
        public string ClientEmail { get; set; }
        public string ClientId { get; set; }
        public int Installments { get; set; }
        public bool HasShipment { get; set; }
        public int? ShipmentAddressId { get; set; }
        public List<PurchaseArticleDetailDTO> PurchaseArticles { get; set; }
    }
}
