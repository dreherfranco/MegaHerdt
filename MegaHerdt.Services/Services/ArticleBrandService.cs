using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Services.Services
{
    public class ArticleBrandService: BaseService<ArticleBrand>
    {
      
        public ArticleBrandService(ArticleBrandHelper articleBrandHelper):
            base(articleBrandHelper)
        {     
        }

        public IQueryable<ArticleBrand> GetStatisticsData(Expression<Func<ArticleBrand, bool>> filter = null)
        {
            return helper.Get(filter)
                .Include(x => x.Articles)
                .ThenInclude(x => x.PurchaseArticles)
                .Include(x => x.Articles)
                .ThenInclude(x => x.ReparationArticles);
        }

        public bool Exist(string brandName)
        {
            var brand = this.helper.Get(x => x.Name.Equals(brandName)).FirstOrDefault();
            if(brand == null)
            {
                return false;
            }
            return true;
        }
    }
}
