
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.PaymentData;
using MercadoPago.Client.Payment;
using mercadopago = MercadoPago.Resource.Payment;
using Stripe;

namespace MegaHerdt.Services.Services
{
    public class PurchasePaymentService
    {
        private readonly PurchasePaymentHelper _helper;
        public PurchasePaymentService(PurchasePaymentHelper _helper)
        {
            this._helper = _helper;
        }

       // [Obsolete]
        //public async Task<Subscription> AddPayment(PurchasePaymentData purchasePaymentData)
        //{
        //    return await this._helper.AddPayment(purchasePaymentData);
        //}

        public async Task<mercadopago.Payment> AddPaymentMP(PurchasePaymentMP purchasePaymentData)
        {
            return await this._helper.AddPaymentMP(purchasePaymentData);
        }
    }
}
