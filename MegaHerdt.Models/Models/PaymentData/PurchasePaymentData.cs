
namespace MegaHerdt.Models.Models.PaymentData
{
    public class PurchasePaymentData
    {
        public string StripeToken { get; set; }
        public string ClientEmail { get; set; }
        public string ClientId { get; set; }
        public int Installments { get; set; }
        public bool HasShipment { get; set; }
        public int ShipmentAddressId { get; set; }
        public List<PurchaseArticleData> PurchaseArticles { get; set; }

    }
}
