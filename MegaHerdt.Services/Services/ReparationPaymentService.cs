using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Services.Services.Base;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ReparationPaymentService
    {
        private readonly ReparationPaymentHelper _helper;
        public ReparationPaymentService(ReparationPaymentHelper _helper)
        {
            this._helper = _helper;
        }

        public async Task<Subscription> AddPayment(ReparationPaymentData reparationPaymentData)
        {
            return await this._helper.AddPayment(reparationPaymentData);
        }
    }
}
