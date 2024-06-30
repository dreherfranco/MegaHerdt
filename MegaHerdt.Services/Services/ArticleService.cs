

using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using MegaHerdt.Services.Services.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ArticleService: BaseService<Article>
    {
        private readonly ArticleHelper _helper;
        private readonly ArticleCategoryHelper _articleCategoryHelper;
        private readonly ArticleProviderItemHelper _articleProviderItemHelper;
        private readonly ArticleProviderHelper _articleProviderHelper;
        private readonly ArticleBrandHelper _articleBrandHelper;
        private readonly ArticleProviderSerialNumberHelper articleProviderSerialNumberHelper;

        /// <summary>
        /// Indica los dias de vigencia de la propiedad Article.ProvisionCreatedDateTime.
        /// El valor de esta propiedad se establece cuando se crea una provision.
        /// </summary>
        public readonly int ProvisionCreatedDateTimeValidityDays = 7;


        public ArticleService(ArticleHelper helper, ArticleCategoryHelper articleCategoryHelper, 
            ArticleBrandHelper articleBrandHelper, ArticleProviderItemHelper articleProviderItemHelper,
            ArticleProviderSerialNumberHelper articleProviderSerialNumberHelper, 
            ArticleProviderHelper articleProviderHelper) :
            base(helper)
        {
            this._helper = helper;
            this._articleCategoryHelper = articleCategoryHelper;
            this._articleBrandHelper = articleBrandHelper;
            this._articleProviderItemHelper = articleProviderItemHelper;
            this.articleProviderSerialNumberHelper = articleProviderSerialNumberHelper;
            _articleProviderHelper = articleProviderHelper;
        }
        public async Task DiscountStockWithSerialNumber(int articleId, List<string> serialNumbers, string discountReason)
        {
            Expression<Func<Article, bool>> filter = x => x.Id == articleId;
            await UpdateSerialNumbers(articleId, serialNumbers);

            // Se crea una instancia de ArticleProvider que representa el descuento del stock.
            var instanceArticleProvider = _articleProviderHelper.CreateDiscountStockInstance(articleId, serialNumbers.Count(), discountReason);
            await _articleProviderHelper.Create(instanceArticleProvider);

            // Descuento stock según la cantidad de Numeros de Serie.
            await this._helper.DiscountStock(filter, serialNumbers.Count);
        }

        public async Task UpdateProvisionCreatedDateTime(IEnumerable<Article> articles)
        {
            foreach (var article in articles)
            {
                if (article.ProvisionCreatedDateTime is not null)
                {
                    // Establezco 7 dias de vigencia.
                    var datetime = article.ProvisionCreatedDateTime.Value.AddDays(ProvisionCreatedDateTimeValidityDays);

                    // Si pasaron 7 dias despues de que se agregó la provisión se tiene que nulear la propiedad ProvisionCreatedDateTime.
                    if (DateTime.UtcNow > datetime)
                    {
                        article.ProvisionCreatedDateTime = null;
                        await Update(article);
                    }
                }
            }
        }

        private async Task UpdateSerialNumbers(int articleId, List<string> serialNumbers)
        {
            serialNumbers = serialNumbers.Select(s => s.ToUpper()).ToList();
            // Items de donde voy a obtener los numeros de serie
            // Obtengo los numeros de serie que estan en stock solamente.
            var articleProviderItemsSerialNumbers = _articleProviderItemHelper
                                                      .GetSerialNumbersByArticleId(articleId, enStock: true)
                                                      .Where(i => serialNumbers.Contains(i.SerialNumber!.ToUpper()))
                                                      .ToList();

            foreach (var serialNumberData in articleProviderItemsSerialNumbers)
            {
                // Actualizar el numero de serie correspondiente a la tabla ArticleProviderSerialNumber
                serialNumberData.EnStock = false;
                await articleProviderSerialNumberHelper.Update(serialNumberData);
            }
 
        }

        public async Task AddStock(int articleId, int value)
        {
            Expression<Func<Article, bool>> filter = x => x.Id == articleId;
            
            await this._helper.AddStock(filter, value);
        }

        public async Task DiscountStock(int articleId, int value)
        {
            Expression<Func<Article, bool>> filter = x => x.Id == articleId;
            await this._helper.DiscountStock(filter, value);
        }

        public IEnumerable<Article> GetArticlesOnOffer()
        {
            var articles = this.helper.Get().ToList();
            var articlesOnOffer = articles.Where(x => x.UnitValue != x.UnitValueWithOffer && x.Enabled);
           
            foreach (var article in articlesOnOffer)
            {
                article.Offers = article.CurrentsOffers().ToList();
            }

            return articlesOnOffer;
        }

        public IEnumerable<Article> GetArticlesByCategory(int categoryId)
        {
            return this.helper.Get().Where(x => x.CategoryId == categoryId && x.Enabled).ToList();

        }

        public IEnumerable<Article> GetArticlesByBrand(int brandId)
        {
            return this.helper.Get().Where(x => x.BrandId == brandId && x.Enabled).ToList();

        }

        public override async Task<Article> Create(Article article)
        {
            article.Code = GenerateCode(article);
            return await this._helper.Create(article);
        }

        public override async Task<string> Update(Article article)
        {
            article.Code = GenerateCode(article);
            await this._helper.Update(article);
            return article.Code;
        }

        public async Task<List<Article>> UpdatePriceByCategory(int categoryId, int percentage)
        {
            Expression<Func<Article, bool>> filter = x => x.CategoryId == categoryId;
            var articles = this.helper.Get(filter).ToList();

            foreach (var article in articles)
            {
                var unitValueToAdd = article.UnitValue * (percentage / 100.0);
                article.UnitValue += (float)unitValueToAdd;
                await this.helper.Update(article);
            }
            return articles;
        }

        private string GenerateCode(Article article)
        {
            // Marca
            var brandId = article.BrandId != 0 ? article.BrandId : article.Brand.Id;           
            var brand = this._articleBrandHelper.Get(x => x.Id == brandId).FirstOrDefault();

            // Categoria
            var categoryId = article.CategoryId != 0 ? article.CategoryId : article.Category.Id;
            var category = this._articleCategoryHelper.Get(x => x.Id == categoryId).FirstOrDefault();

            var brandSubtract = brand.Name.Substring(0, 3);
            var categorySubtract = category.Name.Substring(0, 3);
            string code = brandSubtract + "-" + categorySubtract + "-" + article.Name;
            return code;
        }

        public IEnumerable<Article> GetEnabledsArticles()
        {
            return this.helper.Get().Where(x => x.Enabled);
        }
        
        /// <summary>
        /// Obtener los Numeros de serie como string
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enStock"></param>
        /// <returns></returns>
        public List<string> GetSerialNumbersByArticleId(int id, bool? enStock = null)
        {
            return _articleProviderItemHelper.GetSerialNumbersByArticleId(id, enStock)
                                            // Solo obtengo el string de los numeros de serie
                                             .Select(sn => sn.SerialNumber!)
                                             .ToList();
        }
    }
}
