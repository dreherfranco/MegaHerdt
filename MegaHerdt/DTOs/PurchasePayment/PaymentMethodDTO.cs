using MegaHerdt.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.PurchasePayment
{
    public class PaymentMethodDTO
    {
        public int Id { get; set; }
        public int PayDays { get; set; } = 0;
        [Range(0, 100)]
        public int Commission { get; set; } = 0;
        [Range(0, 100)]
        public int ClientInterest { get; set; } = 0;
        public int InstallmentQuantity { get; set; } = 0;
        public DateTime StartValidity { get; set; } = DateTime.Now;
        public DateTime EndValidity { get; set; } = DateTime.Now;
        public MethodOfPayment Method { get; set; } = MethodOfPayment.Cash;
    }

  
}
