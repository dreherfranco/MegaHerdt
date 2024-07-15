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
        private readonly Repository<ArticleProviderItem> articleProviderItemRepository;
        private readonly Repository<ArticleProviderSerialNumber> articleProviderSerialNumberRepository;

        public ReparationHelper(Repository<Reparation> repository, Repository<Article> _articleRepository,
                                Repository<ArticleProviderItem> articleProviderItemRepository,
                                Repository<ArticleProviderSerialNumber> articleProviderSerialNumberRepository) :
            base(repository)
        {
            this._articleRepository = _articleRepository;
            this.articleProviderItemRepository = articleProviderItemRepository;
            this.articleProviderSerialNumberRepository = articleProviderSerialNumberRepository;
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
                .Include(x => x.ReparationsArticles)
                    .ThenInclude(x => x.SerialNumbers)
                .Include(x=>x.Bill)
                .ThenInclude(x => x.Payments)
                .ThenInclude(p => p.PaymentMethod)
                .OrderByDescending(x => x.Date);
        }

        public override async Task<Reparation> Create(Reparation entity)
        {
            //entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
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
               
                // Si el estado es distinto de entregado
                if (entity.ReparationStateId != ReparationStatesValues.ENTREGADO)
                {
                    ++entity.ReparationStateId;
                }


                // Si el estado de la reparación pasa a en presupuesto se actualizan el precio de los articulos.
                if (entity.ReparationStateId == ReparationStatesValues.EN_PRESUPUESTO)
                {
                    entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);

                    foreach (var reparationArticle in entity.ReparationsArticles)
                    {
                        // Asignar numeros de serie a los articulos de la reparacion.
                        await AssignSerialNumbers(reparationArticle);
                    }
                }

                // Si el estado es Reparado se deben actualizar el stock de los articulos que se incluyeron en la reparación.
                if (entity.ReparationStateId == ReparationStatesValues.REPARADO)
                {
                    await UpdateArticlesStock(entity.ReparationsArticles);
                }

                if (billIsValid(entity.Bill))
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
                if (entity.ReparationStateId != ReparationStatesValues.ENTREGADO)
                {
                    ++entity.ReparationStateId;
                }

                var payments = this.InstancePayments(entity, installments, method);

                if(entity.Bill is null)
                {
                    entity.Bill = new Bill() { Type = "A", ReparationId = entity.Id, Number = "00000000", SaleNumber = "00001" };
                }

                entity.Bill.Payments = payments;

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

                // Si el estado de la reparación pasa a en presupuesto se actualizan el precio de los articulos.
                entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);

                //   entity.ApproximateTime = approximateTime;
                await this.repository.Update(entity);
            }
            else
            {
                entity.ReparationStateId = ReparationStatesValues.CANCELADO; 
                await this.repository.Update(entity);
            }
        }

        public async Task UpdateDecrementState(Reparation entity)
        {
            if (!isFinalState(entity))
            {
               // entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
                --entity.ReparationStateId;

                // Si el estado de la reparación pasa a en presupuesto se actualizan el precio de los articulos.
                if (entity.ReparationStateId == ReparationStatesValues.EN_REVISION)
                {
                    //entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);

                    foreach (var reparationArticle in entity.ReparationsArticles)
                    {
                        // Asignar numeros de serie a los articulos de la reparacion.
                        await RemoveSerialNumbers(reparationArticle);
                    }
                }

                //if (entity.ReparationStateId == ReparationStatesValues.EN_PRESUPUESTO)
                //{
                //    entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
                //}

                await this.repository.Update(entity);
            }
            else
            {
                throw new Exception("Reparation: couldn't update," + entity.ReparationStateId + "is final state");
            }
        }

        private bool isFinalState(Reparation entity)
        {
            return entity.ReparationStateId == ReparationStatesValues.CANCELADO;  // || entity.ReparationStateId == 7 
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

        /// <summary>
        /// Actualiza el stock de los artículos involucrados en la reparación.
        /// </summary>
        /// <param name="reparationArticles"></param>
        /// <returns></returns>
        private async Task UpdateArticlesStock(List<ReparationArticle> reparationArticles)
        {
            foreach (var reparationArticle in reparationArticles)
            {
                var article = this._articleRepository.Get(x => x.Id == reparationArticle.ArticleId).FirstOrDefault();
                article.DiscountStock(reparationArticle.ArticleQuantity);
                await this._articleRepository.Update(article);
            }
        }

        #region Asignar/Remover Numeros de serie
        /// <summary>
        /// Asignar numeros de serie a la compra 
        /// y actualizar ArticleProviderSerialNumber.EnStock = false
        /// </summary>
        /// <param name="reparationArticle"></param>
        /// <returns></returns>
        private async Task AssignSerialNumbers(ReparationArticle reparationArticle)
        {

            // Items de donde voy a obtener los numeros de serie
            // Obtengo los numeros de serie que estan en stock solamente.
            var articleProviderItemsSerialNumbers = articleProviderItemRepository.Get(i => i.ArticleId == reparationArticle.ArticleId)
                                            .Include(i => i.SerialNumbers)
                                            .SelectMany(i => i.SerialNumbers)
                                            .Where(i => i.EnStock)
                                            // Si tiene 3 articulos la reparacion solo tomo 3 numeros de serie
                                            .Take(reparationArticle.ArticleQuantity)
                                            .ToList();

            var article = await _articleRepository.Get(a => a.Id == reparationArticle.ArticleId).SingleAsync();
           
            if (reparationArticle.ArticleQuantity > articleProviderItemsSerialNumbers.Count()) 
            {
                throw new Exception($"Se requieren {reparationArticle.ArticleQuantity} unidades del articulo '{article.Name}', pero solo hay {articleProviderItemsSerialNumbers.Count()} N° de serie cargados.");
            }

            foreach (var serialNumberData in articleProviderItemsSerialNumbers)
            {
                var reparationSerialNumber = new ReparationArticleSerialNumber(serialNumberData.SerialNumber);
                // Agregar el numero de seria a los articulos de la reparacion
                reparationArticle.SerialNumbers.Add(reparationSerialNumber);

                // Actualizar el numero de serie correspondiente a la tabla ArticleProviderSerialNumber
                serialNumberData.EnStock = false;
                await articleProviderSerialNumberRepository.Update(serialNumberData);
            }

        }

        /// <summary>
        /// Remuevo los numeros de serie de ReparationArticle si vuelvo del estado 'En Presupuesto' a 'En Revision',
        /// ya que, se deben asignar de nuevo los articulos para la reparación.
        /// </summary>
        /// <param name="reparationArticle"></param>
        /// <returns></returns>
        private async Task RemoveSerialNumbers(ReparationArticle reparationArticle)
        {

            // Items de donde voy a obtener los numeros de serie
            // Obtengo los numeros de serie que estan en stock solamente.
            var articleProviderItemsSerialNumbers = await articleProviderItemRepository.Get(i => i.ArticleId == reparationArticle.ArticleId)
                                            .Include(i => i.SerialNumbers)
                                            .SelectMany(i => i.SerialNumbers)
                                            .Where(i => !i.EnStock)
                                            //.AsNoTracking()
                                            .ToListAsync();

            foreach (var reparationArticleSerialNumber in reparationArticle.SerialNumbers)
            {
                foreach (var serialNumberData in articleProviderItemsSerialNumbers)
                {

                    if (serialNumberData.SerialNumber.Equals(reparationArticleSerialNumber.SerialNumber))
                    {
                        // Actualizar el numero de serie correspondiente a la tabla ArticleProviderSerialNumber
                        serialNumberData.EnStock = true;
                        articleProviderSerialNumberRepository.SetModifiedState(serialNumberData);
                    }
                }
            }

            // Dejo sin numeros de serie asignados al articulo de la reparación.
            reparationArticle.SerialNumbers.Clear();
        }
        #endregion
    }
}
