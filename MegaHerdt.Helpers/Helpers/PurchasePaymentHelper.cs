﻿using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using MercadoPago.Client.Common;
using MercadoPago.Client.Payment;
using mercadopago = MercadoPago.Resource.Payment;

namespace MegaHerdt.Helpers.Helpers
{
    public class PurchasePaymentHelper
    {
        private readonly Repository<Purchase> purchaseRepository;
        private readonly Repository<Article> articleRepository;
        public PurchasePaymentHelper(Repository<Purchase> purchaseRepository, Repository<Article> articleRepository)
        {
            this.purchaseRepository = purchaseRepository;
            this.articleRepository = articleRepository;
        }

        public async Task<mercadopago.Payment> AddPaymentMP(PurchasePaymentMP purchasePaymentData)
        {
            try
            {
                // Redondear el monto, porque sino falla la transacción.
                var amountNormalized = decimal.Round(purchasePaymentData.Transaction_Amount.GetValueOrDefault(0));

                // Construyo la Request para mandar a la API de MercadoPago y crear el pago.
                var paymentRequest = new PaymentCreateRequest
                {
                    TransactionAmount = amountNormalized,
                    Token = purchasePaymentData.Token,
                    Description = purchasePaymentData.Description,
                    Installments = purchasePaymentData.Installments,
                    PaymentMethodId = purchasePaymentData.Payment_Method_Id,
                    Payer = new PaymentPayerRequest
                    {
                        Email = purchasePaymentData?.Payer?.Email,
                        Identification = new IdentificationRequest
                        {
                            Type = purchasePaymentData?.Payer?.Identification?.Type,
                            Number = purchasePaymentData?.Payer?.Identification?.Number,
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
                    var purchase = await this.CreatePurchase(purchasePaymentData);
                    await this.UpdateArticlesStock(purchasePaymentData.PurchaseArticles);
                    return payment;
                }
                else
                {
                    throw new Exception("The payment has failed");
                }
            }
            catch(Exception ex)
            {
                if (ex.Message.Contains("card_number_validation"))
                {
                    throw new Exception("Numero de tarjeta invalido");
                }
                if (ex.Message.Contains("invalid_address"))
                {
                    throw new Exception("¡Dirección inválida! Revise los datos de envío.");
                }
            }

            // Este throw está por si ocurre un evento no esperado, y tambien porque el metodo espera a que se devuelva un valor.
            throw new Exception("Error en el pago");

        }

        #region Metodos privados
        /// <summary>
        /// Se crea la instancia de una compra con los datos proporcionados.
        /// Por ultimo se almacena en la BDD y devuelve la compra que fue guardada.
        /// </summary>
        /// <param name="purchasePaymentData"></param>
        /// <returns></returns>
        private async Task<Purchase> CreatePurchase(PurchasePaymentMP purchasePaymentData)
        {

            var purchase = new Purchase() { ClientId = purchasePaymentData.ClientId, Date = DateTime.Now };
            var payments = this.InstancePayments(purchasePaymentData);
            var bill = new Bill() { Type = "A", PurchaseId = purchase.Id, Number = "12333555", SaleNumber = "00001", Payments = payments };
            purchase.Bill = bill;

            var purchasesArticles = new List<PurchaseArticle>();
            foreach (var purchaseArticle in purchasePaymentData.PurchaseArticles)
            {
                var newPurchaseArticle = new PurchaseArticle()
                {
                    ArticleId = purchaseArticle.ArticleId,
                    ArticlePriceAtTheMoment = purchaseArticle.ArticlePriceAtTheMoment,
                    ArticleQuantity = purchaseArticle.ArticleQuantity
                };
                purchasesArticles.Add(newPurchaseArticle);
            }
            purchase.PurchasesArticles = purchasesArticles;

            // Si la compra tiene Envio se debe asignar el correspondiente seleccionado.
            if (purchasePaymentData.HasShipment)
            {
                if (purchasePaymentData.ShipmentAddressId is null || purchasePaymentData.ShipmentAddressId == 0) throw new Exception("invalid_address");
                purchase.Shipment = new Shipment() { AddressId = purchasePaymentData.ShipmentAddressId.Value };
            }
            return await this.purchaseRepository.Add(purchase);
        }

        /// <summary>
        /// Actualiza el stock de los articulos involucrados en la compra.
        /// </summary>
        /// <param name="purchaseArticles"></param>
        /// <returns></returns>
        private async Task UpdateArticlesStock(List<PurchaseArticleData> purchaseArticles)
        {
            foreach(var purchaseArticle in purchaseArticles)
            {
                var article = this.articleRepository.Get(x => x.Id == purchaseArticle.ArticleId).FirstOrDefault();
                article.DiscountStock(purchaseArticle.ArticleQuantity);
                await this.articleRepository.Update(article);
            }
        }
  
    
        /// <summary>
        /// Crea los pagos que se van a efectuar para almacenarlos en la BDD
        /// Se tiene en cuenta las cuotas y los precios de los articulos en el momento de efectuar el pago.
        /// </summary>
        /// <param name="purchasePaymentData"></param>
        /// <returns></returns>
        private List<Payment> InstancePayments(PurchasePaymentMP purchasePaymentData)
        {
            var payments = new List<Payment>();
            var amount = 0.0;
            purchasePaymentData.PurchaseArticles.ForEach(x => amount += (x.ArticleQuantity * x.ArticlePriceAtTheMoment));
            for (var i = 0; i < purchasePaymentData.Installments; i++)
            {
                var paymentMethod = new Models.Models.PaymentMethod()
                {
                    InstallmentQuantity = purchasePaymentData.Installments.Value,
                    StartValidity = DateTime.Now.AddMonths(i),
                    EndValidity = DateTime.Now.AddMonths(i + 1),
                };
                var payment = new Payment()
                {
                    Amount = (float)(amount / purchasePaymentData.Installments),
                    PaymentDate = DateTime.Now.AddMonths(i),
                    PaymentMethod = paymentMethod,
                };
                payments.Add(payment);
            }
            return payments;
        }

        #endregion


    }
}
