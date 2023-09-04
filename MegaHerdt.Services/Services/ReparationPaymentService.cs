using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.PaymentData;
using Stripe;
using mercadopago = MercadoPago.Resource.Payment;

namespace MegaHerdt.Services.Services
{
    public class ReparationPaymentService
    {
        private readonly ReparationPaymentHelper _helper;
        public ReparationPaymentService(ReparationPaymentHelper _helper)
        {
            this._helper = _helper;
        }

        public async Task<mercadopago.Payment> AddPaymentMP(ReparationPaymentMP reparationPaymentData )
        {
            return await this._helper.AddPaymentMP(reparationPaymentData);
        }


    }
}
