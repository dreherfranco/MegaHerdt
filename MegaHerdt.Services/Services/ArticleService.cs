

using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ArticleService: BaseService<Article>
    {
        private readonly ArticleHelper _helper;
        private readonly ArticleCategoryHelper _articleCategoryHelper;
        private readonly ArticleBrandHelper _articleBrandHelper;
        public ArticleService(ArticleHelper helper, ArticleCategoryHelper articleCategoryHelper, ArticleBrandHelper articleBrandHelper) :
            base(helper)
        {
            this._helper = helper;
            this._articleCategoryHelper = articleCategoryHelper;
            this._articleBrandHelper = articleBrandHelper;
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
    }
}
