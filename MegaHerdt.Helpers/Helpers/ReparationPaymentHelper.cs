using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using MercadoPago.Client.Common;
using MercadoPago.Client.Payment;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Linq.Expressions;
using mercadopago = MercadoPago.Resource.Payment;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationPaymentHelper
    {
        private readonly Repository<Reparation> reparationRepository;
        private readonly Repository<Bill> billRepository;

        public ReparationPaymentHelper(Repository<Reparation> reparationRepository, Repository<Bill> billRepository)
        {
            this.reparationRepository = reparationRepository;
            this.billRepository = billRepository;
        }

        public async Task<mercadopago.Payment> AddPaymentMP(ReparationPaymentMP reparationPaymentData)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationPaymentData.ReparationId;
            var reparation = this.reparationRepository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .Include(x => x.Bill)
                .FirstOrDefault();


            // Construyo la Request para mandar a la API de MercadoPago y crear el pago.
            var paymentRequest = new PaymentCreateRequest
            {
                TransactionAmount = reparationPaymentData.Transaction_Amount,
                Token = reparationPaymentData.Token,
                Description = reparationPaymentData.Description,
                Installments = reparationPaymentData.Installments,
                PaymentMethodId = reparationPaymentData.Payment_Method_Id,
                Payer = new PaymentPayerRequest
                {
                    Email = reparationPaymentData?.Payer?.Email,
                    Identification = new IdentificationRequest
                    {
                        Type = reparationPaymentData?.Payer?.Identification?.Type,
                        Number = reparationPaymentData?.Payer?.Identification?.Number,
                    },
                    //FirstName = "First Name"
                }
            };

            var client = new PaymentClient();
            // Ejecuto la accion de pago.
            mercadopago.Payment payment = await client.CreateAsync(paymentRequest);

            // Si el pago fue aprobado se debe dejar constancia en la bdd de los productos que fueron comprados y actualizar el stock.
            if (payment.Status == "approved")
            {
                var payments = this.InstancePayments(reparation, reparationPaymentData);
                var bill = this.billRepository.Get(x => x.Id == reparation.BillId).FirstOrDefault();
                bill.Payments = payments;
                await this.billRepository.Update(bill);

                reparation.ReparationStateId = 7;
                await reparationRepository.Update(reparation);
                return payment;
            }
            else
            {
                throw new Exception("The payment has failed");
            }

        }

      

        private List<Payment> InstancePayments(Reparation reparation, ReparationPaymentMP reparationPaymentData)
        {
            var payments = new List<Payment>();
            for (var i = 0; i < reparationPaymentData.Installments; i++) {
                var paymentMethod = new Models.Models.PaymentMethod()
                {
                    InstallmentQuantity = 3,
                    StartValidity = DateTime.Now.AddMonths(i),
                    EndValidity = DateTime.Now.AddMonths(i + 1),
                };

                var total = (reparation.TotalArticleAmount + reparation.Amount);
                var payment = new Payment()
                {
                    Amount = (total / reparationPaymentData.Installments.Value),
                    PaymentDate = DateTime.Now.AddMonths(i),
                    PaymentMethod = paymentMethod,
                    BillId = reparation.BillId
                };
                payments.Add(payment);
            }
            return payments;
        }

    }
}
