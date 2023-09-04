using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models.PaymentData
{
    public class ReparationPaymentMP
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
        public int ReparationId { get; set; }
        #endregion
    }
}
