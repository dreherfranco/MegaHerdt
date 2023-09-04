﻿using MegaHerdt.API.DTOs.PurchaseArticle;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.API.DTOs.ReparationArticle;

namespace MegaHerdt.API.DTOs.ReparationPayment
{

    public class ReparationPaymentMPDTO
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
        public int ReparationId { get; set; }
        #endregion

    }

}
