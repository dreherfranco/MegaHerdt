using MegaHerdt.API.DTOs.PurchaseArticle;
using Org.BouncyCastle.Asn1.Ocsp;

namespace MegaHerdt.API.DTOs.PurchasePayment
{
    public class PurchasePaymentDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public int Tax { get; set; }
    }

  
}
