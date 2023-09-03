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

    public class PurchasePaymentMPDTO
    {
        public object? Transaction_Amount { get; set; }
        public object? Amount { get; set; }
        public object? Token { get; set; }
      //  public object? Description { get; set; }
        public object? Installments { get; set; }
      //  public object? Payment_Method_Id { get; set; }
        public object? Payment_Method_Id { get; set; }
        public object? Payer { get; set; }

    }
}
