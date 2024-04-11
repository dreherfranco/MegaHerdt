
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.PaymentData;
using MercadoPago.Client.Payment;
using mercadopago = MercadoPago.Resource.Payment;
using Stripe;
using MegaHerdt.Models.Models;

namespace MegaHerdt.Services.Services
{
    public class PurchasePaymentService
    {
        private readonly PurchasePaymentHelper _helper;
        public PurchasePaymentService(PurchasePaymentHelper _helper)
        {
            this._helper = _helper;
        }

        public async Task<Purchase> PurchaseReserved(PurchasePaymentMP purchasePaymentData)
        {
            return await this._helper.PurchaseReserved(purchasePaymentData);
        }

        public async Task<mercadopago.Payment> AddPaymentMP(PurchasePaymentMP purchasePaymentData)
        {
            return await this._helper.AddPaymentMP(purchasePaymentData);
        }
    }
}
