using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ArticleCategoryService: BaseService<ArticleCategory>
    {
        public ArticleCategoryService(ArticleCategoryHelper helper):
            base(helper)
        {

        }

        public IQueryable<ArticleCategory> GetStatisticsData(Expression<Func<ArticleCategory, bool>> filter = null)
        {
            return this.helper.Get(filter)
                .Include(x => x.Articles)
                .ThenInclude(x => x.PurchaseArticles);
        }

        public bool Exist(string categoryName)
        {
            var category = this.helper.Get(x => x.Name.Equals(categoryName)).FirstOrDefault();
            if (category == null)
            {
                return false;
            }
            return true;
        }
    }
}
