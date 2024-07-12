using MegaHerdt.API.DTOs.PurchasePayment;

namespace MegaHerdt.API.DTOs.ReparationPayment
{
    public class ReparationPaymentDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public int Tax { get; set; }
        public PaymentMethodDTO PaymentMethod { get; set; }
    }
}
