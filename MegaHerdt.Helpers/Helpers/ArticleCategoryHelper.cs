
using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;

namespace MegaHerdt.Helpers.Helpers
{
    public class ArticleCategoryHelper: BaseHelper<ArticleCategory>
    {
        public ArticleCategoryHelper(Repository<ArticleCategory> repository):
            base(repository)
        {
        }

    }
}
