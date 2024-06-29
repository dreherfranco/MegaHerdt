using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ArticleProviderSerialNumberHelper : BaseHelper<ArticleProviderSerialNumber>
    {
        public ArticleProviderSerialNumberHelper(Repository<ArticleProviderSerialNumber> repository):
            base(repository)
        {
            
        }

    }
}
