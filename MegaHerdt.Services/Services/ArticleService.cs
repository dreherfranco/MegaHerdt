

using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ArticleService: BaseService<Article>
    {
        private readonly ArticleHelper _helper;
        public ArticleService(ArticleHelper helper):
            base(helper)
        {
            this._helper = helper;
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
    }
}
