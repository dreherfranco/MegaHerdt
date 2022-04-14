
using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ArticleBrandHelper: BaseHelper<ArticleBrand>
    {
        public ArticleBrandHelper(Repository<ArticleBrand> repository):
            base(repository)
        {

        }

    }
}
