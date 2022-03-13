using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using Stripe;

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

        public async Task<Subscription> AddPayment(PurchasePaymentData purchasePaymentData)
        {
            var customer = await this.CreateCustomer(purchasePaymentData.ClientEmail, purchasePaymentData.StripeToken);
            var stripeProducts = await this.CreateProduct(purchasePaymentData.PurchaseArticles);
            var prices = await this.CreatePrice(purchasePaymentData.Installments, purchasePaymentData.PurchaseArticles, stripeProducts);
            var subscription = await this.CreateSubscription(customer, prices, purchasePaymentData.PurchaseArticles);

            if (subscription.Status == "active")
            {
                var purchase = await this.CreatePurchase(purchasePaymentData);
                await this.UpdateArticlesStock(purchasePaymentData.PurchaseArticles);
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
            var payments = this.InstancePayments(purchasePaymentData);
            var bill = new Bill() { Type = "A", PurchaseId = purchase.Id, Number=123335554, Payments = payments };
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

        private async Task UpdateArticlesStock(List<PurchaseArticleData> purchaseArticles)
        {
            foreach(var purchaseArticle in purchaseArticles)
            {
                var article = this.articleRepository.Get(x => x.Id == purchaseArticle.ArticleId).FirstOrDefault();
                article.DiscountStock(purchaseArticle.ArticleQuantity);
                await this.articleRepository.Update(article);
            }
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

            /* foreach (var purchaseArticle in purchasesArticles)
             {
                 var options = new ProductCreateOptions
                 {
                     Name = purchaseArticle.ArticleName,
                 };
                  productsStripe.Add(await service.CreateAsync(options));

             }*/
            var options = new ProductCreateOptions
            {
                Name = "Purchase",
            };
            productsStripe.Add(await service.CreateAsync(options));

            return productsStripe;
        }

        private async Task<List<Price>> CreatePrice(int installmentsQuantity, List<PurchaseArticleData> purchasesArticles, List<Product> stripeProducts)
        {
            var service = new PriceService();
            var prices = new List<Price>();
            var total = 0.0;

            /*foreach (var stripeProduct in stripeProducts)
            {       
                
                var purchaseArticle = purchasesArticles.Where(x => x.ArticleName.Contains(stripeProduct.Name)).FirstOrDefault();      
                var options = new PriceCreateOptions
                {
                    Nickname = "Installment",
                    Product = stripeProduct.Id,
                    UnitAmount = (long)purchaseArticle.ArticlePriceAtTheMoment * 100,
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
            }*/
            foreach(var purchaseArticle in purchasesArticles)
            {
                total += purchaseArticle.ArticlePriceAtTheMoment;
            }

            var options = new PriceCreateOptions
            {
                Nickname = "Installment",
                Product = stripeProducts[0].Id,
                UnitAmount = (long)(total * 100),
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

            return prices;
        }

        private async Task<Subscription> CreateSubscription(Customer customer, List<Price> prices, List<PurchaseArticleData> purchasesArticles)
        {
            var productService = new ProductService();
            var subscriptionCreateOptions = new List<SubscriptionItemOptions>();
            foreach (var price in prices)
            {
                var product = productService.Get(price.ProductId);
           //     var purchaseArticle = purchasesArticles.Where(x => x.ArticleName.Contains(product.Name)).FirstOrDefault();
                var subscriptionItemOptions = new SubscriptionItemOptions
                {
                    Price = price.Id,
                    Quantity = 1
                };
                subscriptionCreateOptions.Add(subscriptionItemOptions);
            }


            var optionsSub = new SubscriptionCreateOptions
            {
                Customer = customer.Id,
                Items = subscriptionCreateOptions,
                OffSession = true,         
                CancelAt = DateTime.Now.AddMonths(1)
            };

            var subscriptionService = new SubscriptionService();
            var subscription = await subscriptionService.CreateAsync(optionsSub);
            return subscription;
        }

        private List<Payment> InstancePayments(PurchasePaymentData purchasePaymentData)
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
                };
                payments.Add(payment);
            }
            return payments;
        }


    }
}
