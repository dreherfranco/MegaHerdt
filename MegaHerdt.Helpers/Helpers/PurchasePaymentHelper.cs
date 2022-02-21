using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using Stripe;

namespace MegaHerdt.Helpers.Helpers
{
    public class PurchasePaymentHelper
    {
        private readonly Repository<Purchase> purchaseRepository;
        private readonly Repository<Bill> billRepository;

        public PurchasePaymentHelper(Repository<Purchase> purchaseRepository, Repository<Bill> billRepository)
        {
            this.purchaseRepository = purchaseRepository;
            this.billRepository = billRepository;
        }

        public async Task<Subscription> AddPayment(PurchasePaymentData purchasePaymentData)
        {
            var customer = await this.CreateCustomer(purchasePaymentData.ClientEmail, purchasePaymentData.StripeToken);
            var stripeProducts = await this.CreateProduct(purchasePaymentData.PurchaseArticles);
            var prices = await this.CreatePrice(purchasePaymentData.Installments, purchasePaymentData.PurchaseArticles, stripeProducts);
            var subscription = await this.CreateSubscription(customer, prices, purchasePaymentData.PurchaseArticles);

            if (subscription.Status == "active")
            {
                var purchase = await this.CreatePurchase(purchasePaymentData);
                //save payment in DB
                var payments = this.InstancePayments(subscription, purchase, purchasePaymentData);
                var bill = this.billRepository.Get(x => x.Id == purchase.BillId).FirstOrDefault();
                bill.Payments = payments;
                await this.billRepository.Update(bill);

                return subscription;
            }
            else
            {
                throw new Exception("The payment has failed");
            }

        }
        private async Task<Purchase> CreatePurchase(PurchasePaymentData purchasePaymentData)
        {
            
            var purchase = new Purchase() { ClientId = purchasePaymentData.ClientId, Date = DateTime.Now};
            var bill = new Bill() { Type = "A", PurchaseId = purchase.Id, Number=123335554 };
            purchase.Bill = bill;

            var purchasesArticles = new List<PurchaseArticle>();
            foreach(var purchaseArticle in purchasePaymentData.PurchaseArticles)
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

            if (purchasePaymentData.HasShipment)
            {
                purchase.Shipment = new Shipment() { AddressId = purchasePaymentData.ShipmentAddressId };            
            }
            return await this.purchaseRepository.Add(purchase);
        }

        private async Task<Customer> CreateCustomer(string customerEmail, string stripeToken)
        {
            var customerService = new CustomerService();

            var customer = await customerService.CreateAsync(new CustomerCreateOptions
            {
                Email = customerEmail,
                Source = stripeToken
            });
            return customer;
        }

        private async Task<List<Product>> CreateProduct(List<PurchaseArticleData> purchasesArticles)
        {
            var service = new ProductService();
            var productsStripe = new List<Product>();

            foreach (var purchaseArticle in purchasesArticles)
            {
                if (service.Get(purchaseArticle.ArticleId.ToString()) != null)
                {
                    var options = new ProductUpdateOptions
                    {
                        Name = purchaseArticle.ArticleName,
                    };
                    productsStripe.Add(await service.UpdateAsync(purchaseArticle.ArticleId.ToString(), options));
                }
                else
                {

                    var options = new ProductCreateOptions
                    {
                        Name = purchaseArticle.ArticleName,
                    };
                    productsStripe.Add(await service.CreateAsync(options));
                }
            }

            return productsStripe;
        }

        private async Task<List<Price>> CreatePrice(int installmentsQuantity, List<PurchaseArticleData> purchasesArticles, List<Product> stripeProducts)
        {
            var service = new PriceService();
            var prices = new List<Price>();

            foreach (var stripeProduct in stripeProducts)
            {
                var purchaseArticle = purchasesArticles.Where(x => x.ArticleName.Contains(stripeProduct.Name)).FirstOrDefault();
                var options = new PriceCreateOptions
                {
                    Nickname = "Installment",
                    Product = stripeProduct.Id,
                    UnitAmount = (long)purchaseArticle.ArticlePriceAtTheMoment,
                    Currency = "ars",
                    Recurring = new PriceRecurringOptions
                    {
                        Interval = "month",
                        IntervalCount = installmentsQuantity,
                        UsageType = "licensed",
                    },
                };
                var price = await service.CreateAsync(options);

                prices.Add(price);
            }                            
            
            return prices;
        }

        private async Task<Subscription> CreateSubscription(Customer customer, List<Price> prices, List<PurchaseArticleData> purchasesArticles)
        {
            var productService = new ProductService();
            var subscriptionCreateOptions = new List<SubscriptionItemOptions>();
            foreach (var price in prices)
            {
                var product = productService.Get(price.ProductId);
                var purchaseArticle = purchasesArticles.Where(x=>x.ArticleName.Contains(product.Name)).FirstOrDefault();
                var subscriptionItemOptions = new SubscriptionItemOptions
                {
                    Price = price.Id,
                    Quantity = purchaseArticle.ArticleQuantity
                };
                subscriptionCreateOptions.Add(subscriptionItemOptions);
            }


            var optionsSub = new SubscriptionCreateOptions
            {
                Customer = customer.Id,
                Items = subscriptionCreateOptions,
                OffSession = true,
                CancelAt = DateTime.Now.AddMonths(3),
            };

            var subscriptionService = new SubscriptionService();
            var subscription = await subscriptionService.CreateAsync(optionsSub);
            return subscription;
        }

        private List<Payment> InstancePayments(Subscription subscription, Purchase purchase, PurchasePaymentData purchasePaymentData)
        {
            var payments = new List<Payment>();
            var amount = 0.0;
            purchasePaymentData.PurchaseArticles.ForEach(x => amount += (x.ArticleQuantity * x.ArticlePriceAtTheMoment));
            for (var i = 0; i < purchasePaymentData.Installments; i++)
            {
                var paymentMethod = new Models.Models.PaymentMethod()
                {
                    InstallmentQuantity = purchasePaymentData.Installments,
                    StartValidity = DateTime.Now.AddMonths(i),
                    EndValidity = DateTime.Now.AddMonths(i + 1),
                };
                var payment = new Payment()
                {
                    Amount =(float)(amount / purchasePaymentData.Installments),
                    PaymentDate = DateTime.Now,
                    PaymentMethod = paymentMethod,
                    BillId = purchase.BillId
                };
                payments.Add(payment);
            }
            return payments;
        }
    }
}
