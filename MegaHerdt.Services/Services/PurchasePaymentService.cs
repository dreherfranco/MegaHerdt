
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.PaymentData;
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

        public async Task<Subscription> AddPayment(PurchasePaymentData purchasePaymentData)
        {
            return await this._helper.AddPayment(purchasePaymentData);
        }
    }
}
