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
