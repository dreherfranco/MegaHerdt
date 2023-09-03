
namespace MegaHerdt.Models.Models.PaymentData
{
    //[Obsolete]
    //public class PurchasePaymentData
    //{
    //    public string StripeToken { get; set; }
    //    public string ClientEmail { get; set; }
    //    public string ClientId { get; set; }
    //    public int Installments { get; set; }
    //    public bool HasShipment { get; set; }
    //    public int ShipmentAddressId { get; set; }
    //    public List<PurchaseArticleData> PurchaseArticles { get; set; }

    //}

    public class PurchasePaymentMP
    {
        #region Datos para efectuar el pago
        public decimal? Transaction_Amount { get; set; }
        public string? Token { get; set; }
        public string? Description { get; set; }
        public int? Installments { get; set; }
        public string? Payment_Method_Id { get; set; }
        public PurchasePaymentPayerMP? Payer { get; set; }
        #endregion

        #region Datos para dejar constancia del pago en la BDD
        public string? ClientEmail { get; set; }
        public string? ClientId { get; set; }
        public bool HasShipment { get; set; } = false;
        public int? ShipmentAddressId { get; set; }
        public List<PurchaseArticleData>? PurchaseArticles { get; set; }
        #endregion

    }

    public class PurchasePaymentPayerMP
    {
        public string? Email { get; set; }
        //    public string? FirstName { get; set; }
        public PurchasePaymentPayerIdentificationMP? Identification { get; set; }
    }
    public class PurchasePaymentPayerIdentificationMP
    {
        public string? Type { get; set; }
        public string? Number { get; set; }
    }
}
