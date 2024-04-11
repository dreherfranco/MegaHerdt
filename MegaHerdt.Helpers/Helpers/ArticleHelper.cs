
using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ArticleHelper: BaseHelper<Article>
    {
        public ArticleHelper(Repository<Article> repository):
            base(repository)
        {

        }
        public async Task AddStock(Expression<Func<Article, bool>> filter, int value)
        {
            var article = this.repository.Get(filter)
                .FirstOrDefault();
            if (article == null) { throw new Exception("article not exists"); }

            article.AddStock(value);
            await this.repository.Update(article);
        }

        public async Task DiscountStock(Expression<Func<Article, bool>> filter, int value)
        {
            var article = this.repository.Get(filter)
                .FirstOrDefault();
            if (article == null) { throw new Exception("article not exists"); }

            article.DiscountStock(value);
            await this.repository.Update(article);
        }

        public override IQueryable<Article> Get(Expression<Func<Article, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Brand)
                .Include(x => x.Category)
                .Include(x => x.Offers);
             //   .Include(x => x.ArticlesPro;viders)
              //  .ThenInclude(x => x.Provider);
        }

        private string GenerateCode(Article article)
        {
            var brandSubstrack = article.Brand.Name.Substring(0, 3);
            var categorySubstrack = article.Category.Name.Substring(0, 3);
            string code = brandSubstrack + "-" + categorySubstrack + "-" + article.Name;
            return code;
        }

        public override async Task Delete(Article entity)
        {
            if (entity != null)
            {
                entity.Enabled = false;
                await this.repository.Update(entity);
            }
        }

    }
}
