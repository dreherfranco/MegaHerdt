using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models.PaymentData
{
    public class ReparationPaymentData
    {
        public string StripeToken { get; set; }
        public int ReparationId { get; set; }
        public int Installments { get; set; }
    }
}
