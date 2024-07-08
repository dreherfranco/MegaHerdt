using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationHelper: BaseHelper<Reparation>
    {
        private readonly Repository<Article> _articleRepository;
        public ReparationHelper(Repository<Reparation> repository, Repository<Article> _articleRepository) :
            base(repository)
        {
            this._articleRepository = _articleRepository;
        }

        public override IQueryable<Reparation> Get(Expression<Func<Reparation, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Employee)
                .Include(x => x.ReparationState)
                .Include(x => x.ReparationsClaims)
                .Include(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .Include(x=>x.Bill)
                .ThenInclude(x => x.Payments)
                .ThenInclude(p => p.PaymentMethod)
                .OrderByDescending(x => x.Date);
        }

        public override async Task<Reparation> Create(Reparation entity)
        {
            entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
            return await this.repository.Add(entity);
        }

        public override async Task Delete(Reparation entity)
        {
            if (entity != null)
            {
                entity.Enabled = false;
                await this.repository.Update(entity);
            }
        }

        public override async Task Update(Reparation entity)
        {
            if (!isFinalState(entity))
            {
                entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
                // Si el estado es distinto de entregado
                if (entity.ReparationStateId != 7)
                {
                    
                    ++entity.ReparationStateId;
                }
                
                
                if(billIsValid(entity.Bill))
                {
                    entity.Facturada = true;
                }
                await this.repository.Update(entity);
            }
            else
            {
                throw new Exception("Reparation: couldn't update," + entity.ReparationStateId + "is final state");
            }
        }

        public async Task UpdateFromReparadoToPresupuesto(Reparation entity, int installments, MethodOfPayment method)
        {
            if (!isFinalState(entity))
            {
                entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
                
                // Si el estado es distinto de entregado
                if (entity.ReparationStateId != 7)
                {

                    ++entity.ReparationStateId;
                }


                if (billIsValid(entity.Bill))
                {
                    entity.Facturada = true;
                }

                var payments = this.InstancePayments(entity, installments, method);

                entity.Bill.Payments = payments;
                //var bill = new Bill() { Type = "A", PurchaseId = purchase.Id, Number = "00000000", SaleNumber = "00001", Payments = payments };
                //entity.Bill = bill;

                await this.repository.Update(entity);
            }
            else
            {
                throw new Exception("Reparation: couldn't update," + entity.ReparationStateId + "is final state");
            }
        }

        private List<Payment> InstancePayments(Reparation reparation, int installments, MethodOfPayment method)
        {
            var payments = new List<Payment>();
            var amount = reparation.TotalArticleAmount + reparation.Amount;

            for (var i = 0; i < installments; i++)
            {
                var instancePaymentMethod = new Models.Models.PaymentMethod()
                {
                    InstallmentQuantity = installments,
                    StartValidity = DateTime.Now.AddMonths(i),
                    EndValidity = DateTime.Now.AddMonths(i + 1),
                    Method = method
                };
                var payment = new Payment()
                {
                    Amount = (float)(amount / installments),
                    PaymentDate = DateTime.Now.AddMonths(i),
                    PaymentMethod = instancePaymentMethod,
                };
                payments.Add(payment);
            }
            return payments;
        }

        private bool billIsValid(Bill? bill)
        {
            return bill is not null && bill.Number != "00000000";
        }

        public async Task UpdateBudget(Reparation entity, bool isAccepted/*, DateTime approximateTime*/)
        {
            if (isAccepted)
            {
                ++entity.ReparationStateId;
             //   entity.ApproximateTime = approximateTime;
                await this.repository.Update(entity);
            }
            else
            {
                entity.ReparationStateId = 8; 
                await this.repository.Update(entity);
            }
        }

        public async Task UpdateDecrementState(Reparation entity)
        {
            if (!isFinalState(entity))
            {
                entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
                --entity.ReparationStateId;
                
                await this.repository.Update(entity);
            }
            else
            {
                throw new Exception("Reparation: couldn't update," + entity.ReparationStateId + "is final state");
            }
        }

        private bool isFinalState(Reparation entity)
        {
            return entity.ReparationStateId == 8;  // || entity.ReparationStateId == 7 
        }

        private List<ReparationArticle> SetArticlePriceAtTheMoment(Reparation entity)
        {
            var reparationsArticlesList = new List<ReparationArticle>();
            foreach (var reparationArticle in entity.ReparationsArticles)
            {
                Expression<Func<Article, bool>> filter = x => x.Id == reparationArticle.ArticleId;
                var article = _articleRepository.Get(filter).FirstOrDefault();
                if (article != null)
                {
                    reparationArticle.ArticlePriceAtTheMoment = article.UnitValueWithOffer;
                    reparationsArticlesList.Add(reparationArticle);
                }
                else { throw new Exception("Article not exists"); }
            }
            return reparationsArticlesList;
        }
    }
}
