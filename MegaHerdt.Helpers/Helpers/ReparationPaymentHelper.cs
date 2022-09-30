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
        private readonly Repository<Bill> billRepository;

        public ReparationPaymentHelper(Repository<Reparation> reparationRepository, Repository<Bill> billRepository)
        {
            this.reparationRepository = reparationRepository;
            this.billRepository = billRepository;
        }

        public async Task<Subscription> AddPayment(ReparationPaymentData reparationPaymentData)
        {
            Expression<Func<Reparation, bool>> filter = x => x.Id == reparationPaymentData.ReparationId;
            var reparation = this.reparationRepository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.ReparationsArticles)             
                .ThenInclude(x => x.Article)
                .Include(x => x.Bill)
                .FirstOrDefault();
            
            var customer = await this.CreateCustomer(reparation.Client.Email, reparationPaymentData.StripeToken);
            var stripeProducts = await this.CreateProduct(reparation.ReparationsArticles);
            var prices = await this.CreatePrice(reparationPaymentData.Installments, reparation.ReparationsArticles, stripeProducts, reparation);
            var subscription = await this.CreateSubscription(customer, prices, reparation.ReparationsArticles);
           
            if (subscription.Status == "active")
            {
                //save payment in DB
                var payments = this.InstancePayments(subscription, reparation, reparationPaymentData);
                var bill = this.billRepository.Get(x => x.Id == reparation.BillId).FirstOrDefault();
                bill.Payments = payments;
                await this.billRepository.Update(bill);
                
                reparation.ReparationStateId = 7;
                await reparationRepository.Update(reparation);  
                return subscription;
            }
            else
            {
                throw new Exception("The payment has failed");
            }

        }

        private async Task<Customer> CreateCustomer(string customerEmail,string stripeToken)
        {
            var customerService = new CustomerService();

            var customer = await customerService.CreateAsync(new CustomerCreateOptions
            {
                Email = customerEmail,
                Source = stripeToken        
            });
            return customer;
        }

        private async Task<List<Product>> CreateProduct(List<ReparationArticle> reparationsArticles)
        {
            var service = new ProductService();
            var productsStripe = new List<Product>();
      
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

            foreach (var stripeProduct in stripeProducts)
            {
                var options = new PriceCreateOptions
                {
                    Nickname = "Installment",
                    Product = stripeProduct.Id,
                    UnitAmount = (long)(reparation.Amount * 100) / installmentsQuantity,
                    Currency = "ars",
                    Recurring = new PriceRecurringOptions
                    {
                        Interval = "month",
                        IntervalCount = installmentsQuantity,
                        UsageType = "licensed"
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

        private List<Payment> InstancePayments(Subscription subscription,Reparation reparation, ReparationPaymentData reparationPaymentData)
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
                    Amount = (total / reparationPaymentData.Installments),
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
