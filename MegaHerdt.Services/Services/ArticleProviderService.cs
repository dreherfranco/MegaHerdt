using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ArticleProviderService: BaseService<ArticleProvider>
    {
        private readonly ArticleHelper _articleHelper;
        public ArticleProviderService(ArticleProviderHelper helper, ArticleHelper _articleHelper) :
            base(helper)
        {
            this._articleHelper = _articleHelper;
        }

        public override async Task<ArticleProvider> Create(ArticleProvider articleProvider)
        {
            if (articleProvider.Add)
            {
                await this.AddProvision(articleProvider);
            }
            else
            {
                await this.DiscountProvision(articleProvider);
            }
            return await this.helper.Create(articleProvider);

        }

        public async Task AddProvision(ArticleProvider articleProvider)
        {
            Expression<Func<Article, bool>> filter = x => x.Id == articleProvider.ArticleId;
            await this._articleHelper.AddStock(filter, articleProvider.ArticleQuantity);
        }

        public async Task DiscountProvision(ArticleProvider articleProvider)
        {
            Expression<Func<Article, bool>> filter = x => x.Id == articleProvider.ArticleId;
            await this._articleHelper.DiscountStock(filter, articleProvider.ArticleQuantity);
        }
    }
}
