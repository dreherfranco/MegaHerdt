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
    public class ArticleProviderService: BaseService<ArticleProvider>
    {
        private readonly ArticleHelper _articleHelper;
        public ArticleProviderService(ArticleProviderHelper helper, ArticleHelper _articleHelper) :
            base(helper)
        {
            this._articleHelper = _articleHelper;
        }

        /// <summary>
        /// Configura la entidad ArticleProviderItem para proveer el articulo.
        /// </summary>
        /// <param name="articleProvider"></param>
        /// <returns></returns>
        private async Task ConfigureArticlesItems(ArticleProvider articleProvider)
        {
            foreach (var item in articleProvider.ArticlesItems)
            {
                item._articleConfiguration = await _articleHelper.Get(a => a.Id == item.ArticleId).FirstOrDefaultAsync();
            }
        }

        public override async Task<ArticleProvider> Create(ArticleProvider articleProvider)
        {
           await ConfigureArticlesItems(articleProvider);

            if (!articleProvider.IsBroken())
            {

                if (articleProvider.Add)
                {
                    await this.AddProvision(articleProvider);
                }
                else
                {
                    await this.DiscountProvision(articleProvider);
                }
                return await this.helper.Create(articleProvider);

            }
            else
            {
                var errorMessage = string.Join("\n", articleProvider.ErrorMessages);
                throw new Exception(errorMessage);
            }
        }

        public async Task AddProvision(ArticleProvider articleProvider)
        {
            // MEJORAR ESTA LOGICA, QUE NO SE HAGA EL FOREACH EN ESTE TRAMO.
            foreach (var item in articleProvider.ArticlesItems)
            {
                Expression<Func<Article, bool>> filter = x => x.Id == item.ArticleId;
                await this._articleHelper.AddStock(filter, item.ArticleQuantity);
            }
           
        }

        public async Task DiscountProvision(ArticleProvider articleProvider)
        {
            // MEJORAR ESTA LOGICA, QUE NO SE HAGA EL FOREACH EN ESTE TRAMO.
            foreach (var item in articleProvider.ArticlesItems)
            {
                Expression<Func<Article, bool>> filter = x => x.Id == item.ArticleId;
                await this._articleHelper.DiscountStock(filter, item.ArticleQuantity);
            }
        }
    }
}
