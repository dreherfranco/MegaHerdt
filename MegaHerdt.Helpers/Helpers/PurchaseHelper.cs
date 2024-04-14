using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace MegaHerdt.Helpers.Helpers
{
    public class PurchaseHelper: BaseHelper<Purchase>
    {
        public PurchaseHelper(Repository<Purchase> repository):
            base(repository)
        {
        }

        public override IQueryable<Purchase> Get(Expression<Func<Purchase, bool>> filter = null)
        {
            var purchases = repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.PurchasesClaims)
                .Include(x => x.PurchasesArticles)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Brand)
                            .ThenInclude(x => x.Articles)
                .Include(x => x.PurchasesArticles)
                    .ThenInclude(x => x.Article)
                        .ThenInclude(x => x.Category)
                           .ThenInclude(x => x.Articles)
                .Include(x => x.PurchasesArticles)
                    .ThenInclude(x => x.SerialNumbers)
                .Include(x => x.Shipment)
                    .ThenInclude(x => x.Address)
                .Include(x => x.Shipment)
                    .ThenInclude(x => x.TransportCompany)
                .Include(x => x.Bill)
                    .ThenInclude(x => x.Payments)
                        .ThenInclude(x => x.PaymentMethod)
                .OrderByDescending(x => x.Date);
            return purchases;
        }

        /// <summary>
        /// Pasar del estado Reserved al estado Paid.
        /// </summary>
        /// <param name="purchase"></param>
        /// <param name="paymentsQuantity">Cantidad de pagos en los que se hizo la compra (cantidad de cuotas)</param>
        /// <returns></returns>
        public async Task<Purchase> FromReservedToPaid(Purchase purchase, int paymentsQuantity)
        {
            purchase.State = PurchaseState.Paid;

            // Nulleo todos los articulos por problema en el change tracker, de todos modos, 
            // la entidad PurchaseArticle hace referencia al articulo con la propiedad ArticleId (FK de articulo),
            // por lo cual no se pierde la referencia al mismo.
            purchase.PurchasesArticles.ForEach(i => i.Article = null);

            var payments = InstancePayments(purchase, paymentsQuantity);
            purchase.Bill.Payments = payments;

            await this.repository.Update(purchase);
            return purchase;
        }

        public async Task<Purchase> FromPaidToDelivered(Purchase purchase)
        {
            purchase.State = PurchaseState.Delivered;

            // Nulleo todos los articulos por problema en el change tracker, de todos modos, 
            // la entidad PurchaseArticle hace referencia al articulo con la propiedad ArticleId (FK de articulo),
            // por lo cual no se pierde la referencia al mismo.
            purchase.PurchasesArticles.ForEach(i => i.Article = null);
            purchase.Bill.Payments.ForEach(i => i.PaymentMethod = null);

            await this.repository.Update(purchase);
            return purchase;
        }

        #region Auxiliars Methods
        /// <summary>
        /// Crea los pagos que se van a efectuar para almacenarlos en la BDD
        /// Se tiene en cuenta las cuotas y los precios de los articulos en el momento de efectuar el pago.
        /// </summary>
        /// <param name="purchase"></param>
        /// <param name="paymentsQuantity">Cantidad de pagos en los que se hizo la compra (cantidad de cuotas)</param>
        /// <returns></returns>
        private List<Payment> InstancePayments(Purchase purchase, int paymentsQuantity)
        {
            var payments = new List<Payment>();
            var amount = 0.0;
            purchase.PurchasesArticles.ForEach(x => amount += (x.ArticleQuantity * x.ArticlePriceAtTheMoment));
            for (var i = 0; i < paymentsQuantity; i++)
            {
                var paymentMethod = new Models.Models.PaymentMethod()
                {
                    InstallmentQuantity = paymentsQuantity,
                    StartValidity = DateTime.Now.AddMonths(i),
                    EndValidity = DateTime.Now.AddMonths(i + 1),
                };
                var payment = new Payment()
                {
                    Amount = (float)(amount / paymentsQuantity),
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
