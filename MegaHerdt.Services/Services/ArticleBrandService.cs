using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;

namespace MegaHerdt.Services.Services
{
    public class ArticleBrandService: BaseService<ArticleBrand>
    {
      
        public ArticleBrandService(ArticleBrandHelper articleBrandHelper):
            base(articleBrandHelper)
        {     
        }

    }
}
