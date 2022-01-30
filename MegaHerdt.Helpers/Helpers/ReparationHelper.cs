using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationHelper: BaseHelper<Reparation>
    {
        private readonly Repository<Article> _articleRepository;
        public ReparationHelper(Repository<Reparation> repository, Repository<Article> _articleRepository) :
            base(repository)
        {
            this._articleRepository = _articleRepository;
        }

        public override IQueryable<Reparation> Get(Expression<Func<Reparation, bool>> filter = null)
        {
            return repository.Get(filter)
                .Include(x => x.Client)
                .Include(x => x.Employee)
                .Include(x => x.ReparationState)
                .Include(x => x.ReparationsArticles)
                .ThenInclude(x => x.Article)
                .Include(x=>x.Bill);
        }

        public override async Task<Reparation> Create(Reparation entity)
        {
            entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
            return await this.repository.Add(entity);
        }

        public override async Task Update(Reparation entity)
        {
            entity.ReparationsArticles = this.SetArticlePriceAtTheMoment(entity);
            await this.repository.Update(entity);
        }

        private List<ReparationArticle> SetArticlePriceAtTheMoment(Reparation entity)
        {
            var reparationsArticlesList = new List<ReparationArticle>();
            foreach (var reparationArticle in entity.ReparationsArticles)
            {
                Expression<Func<Article, bool>> filter = x => x.Id == reparationArticle.ArticleId;
                var article = _articleRepository.Get(filter).FirstOrDefault();
                if (article != null)
                {
                    reparationArticle.ArticlePriceAtTheMoment = article.UnitValueWithOffer;
                    reparationsArticlesList.Add(reparationArticle);
                }
                else { throw new Exception("Article not exists"); }
            }
            return reparationsArticlesList;
        }
    }
}
