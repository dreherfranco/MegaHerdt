using MegaHerdt.API.DTOs.PurchaseArticle;

namespace MegaHerdt.API.DTOs.PurchasePayment
{
    //[Obsolete]
    //public class PurchasePaymentConfirmDTO
    //{
    //    public string StripeToken { get; set; }
    //    public string ClientEmail { get; set; }
    //    public string ClientId { get; set; }
    //    public int Installments { get; set; }
    //    public bool HasShipment { get; set; }
    //    public int? ShipmentAddressId { get; set; }
    //    public List<PurchaseArticleDetailDTO> PurchaseArticles { get; set; }
    //}

    public class PurchasePaymentMPDTO
    {
        #region Datos para efectuar el pago
        public decimal? Transaction_Amount { get; set; }
        public string? Token { get; set; }
        public string? Description { get; set; }
        public int? Installments { get; set; }
        public string? Payment_Method_Id { get; set; }
        public PurchasePaymentPayerMPDTO? Payer { get; set; }
        #endregion

        #region Datos para dejar constancia del pago en la BDD
        public string? ClientEmail { get; set; }
        public string? ClientId { get; set; }
        public bool HasShipment { get; set; } = false;
        public int? ShipmentAddressId { get; set; }
        public List<PurchaseArticleDetailDTO>? PurchaseArticles { get; set; }
        #endregion

    }

    public class PurchasePaymentPayerMPDTO
    {
        public string? Email { get; set; }
        //    public string? FirstName { get; set; }
        public PurchasePaymentPayerIdentificationMPDTO? Identification { get; set; }
    }
    public class PurchasePaymentPayerIdentificationMPDTO
    {
        public string? Type { get; set; }
        public string? Number { get; set; }
    }
}
