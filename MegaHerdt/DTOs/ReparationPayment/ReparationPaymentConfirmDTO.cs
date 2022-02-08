using MegaHerdt.API.DTOs.ReparationArticle;

namespace MegaHerdt.API.DTOs.ReparationPayment
{
    public class ReparationPaymentConfirmDTO
    {
        public string StripeToken { get; set; }
        public int ReparationId { get; set; }
        public int Installments { get; set; }
    }
}
