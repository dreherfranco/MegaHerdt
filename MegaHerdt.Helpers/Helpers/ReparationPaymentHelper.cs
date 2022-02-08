using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationPaymentHelper
    {
        private readonly Repository<Reparation> reparationRepository;

        public ReparationPaymentHelper(Repository<Reparation> reparationRepository)
        {
            this.reparationRepository = reparationRepository;
        }

        public async Task<Subscription> AddPayment(ReparationPaymentData reparationPaymentData)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationPaymentData.ReparationId;
            var reparation = this.reparationRepository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .FirstOrDefault();
            var customer = await this.CreateCustomer(reparation.Client.Email, reparationPaymentData.StripeToken);
            var stripeProducts = await this.CreateProduct(reparation.ReparationsArticles);
            var prices = await this.CreatePrice(reparationPaymentData.Installments, reparation.ReparationsArticles, stripeProducts, reparation);
            var subscription = await this.CreateSubscription(customer, prices, reparation.ReparationsArticles);
            return subscription;
        }

        private async Task<Customer> CreateCustomer(string customerEmail,string stripeToken)
        {
            var customerService = new CustomerService();

            var customer = await customerService.CreateAsync(new CustomerCreateOptions
            {
                Email = customerEmail,
                Source = stripeToken,               
            });
            return customer;
        }

        private async Task<List<Product>> CreateProduct(List<ReparationArticle> reparationsArticles)
        {
            var service = new ProductService();
            var productsStripe = new List<Product>();

            /*
               foreach(var reparationArticle in reparationsArticles)
               {
                   if (service.Get(reparationArticle.ArticleId.ToString()) != null)
                   {
                       var options = new ProductUpdateOptions
                       {
                           Name = reparationArticle.Article.Name,
                       };
                       productsStripe.Add(await service.UpdateAsync(reparationArticle.ArticleId.ToString(), options));
                   }
                   else
                   {
                       var options = new ProductCreateOptions
                       {
                           Name = reparationArticle.Article.Name,
                       };
                       productsStripe.Add(await service.CreateAsync(options));
                   }
               }
            */

                var options = new ProductCreateOptions
                {
                    Name = "Reparacion de pc",
                };
                productsStripe.Add(await service.CreateAsync(options));
            
            return productsStripe;
        }

        private async Task<List<Price>> CreatePrice(int installmentsQuantity, List<ReparationArticle> reparationsArticles, List<Product> stripeProducts, Reparation reparation)
        {
            var service = new PriceService();
            var prices = new List<Price>();
            /*
            foreach (var stripeProduct in stripeProducts)
            {
                var reparationArticle = reparationsArticles.Where(x => x.Article.Name.Contains(stripeProduct.Name)).FirstOrDefault();
                var options = new PriceCreateOptions
                {
                    Nickname = "Installment",
                    Product = stripeProduct.Id,
                    UnitAmount = (long) reparationArticle.ArticlePriceAtTheMoment,
                    Currency = "ars",
                    Recurring = new PriceRecurringOptions
                    {
                        Interval = "month",
                        IntervalCount = installmentsQuantity,
                        UsageType = "licensed",
                    },
                };
            */
            foreach (var stripeProduct in stripeProducts)
            {
                var options = new PriceCreateOptions
                {
                    Nickname = "Installment",
                    Product = stripeProduct.Id,
                    UnitAmount = (long)reparation.Amount * 100,
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

        private async Task<Subscription> CreateSubscription(Customer customer, List<Price> prices, List<ReparationArticle> reparationsArticles)
        {
            var productService = new ProductService();
            var subscriptionCreateOptions = new List<SubscriptionItemOptions>();
            foreach (var price in prices)
            {
               // var product = productService.Get(price.ProductId);
             //   var reparationArticle = reparationsArticles.Where(x=>x.Article.Name.Contains(product.Name)).FirstOrDefault();
                var subscriptionItemOptions = new SubscriptionItemOptions
                {
                    Price = price.Id,
                    Quantity = 1 /*reparationArticle.ArticleQuantity*/
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

            var serviceSub = new SubscriptionService();
            var subscription = await serviceSub.CreateAsync(optionsSub);
            return subscription;
        }
    }
}
