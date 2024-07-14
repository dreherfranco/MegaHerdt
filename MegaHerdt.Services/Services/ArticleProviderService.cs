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
    public class ArticleProviderService : BaseService<ArticleProvider>
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
        private async Task ConfigureArticlesItems(ArticleProvider articleProvider, List<ArticleProviderSerialNumber> serialNumbersPersisted)
        {
            foreach (var item in articleProvider.ArticlesItems)
            {
                item._articleConfiguration = await _articleHelper.Get(a => a.Id == item.ArticleId).FirstOrDefaultAsync();
                item._serialNumbersPersisted = serialNumbersPersisted;
            }
        }

        public override async Task<ArticleProvider> Create(ArticleProvider articleProvider)
        {
            var serialNumbersPersisted = await GetSerialNumbersPersisted(articleProvider);
            await ConfigureArticlesItems(articleProvider, serialNumbersPersisted);
            
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

        private async Task<List<ArticleProviderSerialNumber>> GetSerialNumbersPersisted(ArticleProvider articleProvider)
        {
            var serialNumbers = await helper.Get().SelectMany(i => i.ArticlesItems).SelectMany(i => i.SerialNumbers!).ToListAsync();
            return serialNumbers;
        }

        public async Task AddProvision(ArticleProvider articleProvider)
        {
            // MEJORAR ESTA LOGICA, QUE NO SE HAGA EL FOREACH EN ESTE TRAMO.
            foreach (var item in articleProvider.ArticlesItems)
            {
                Expression<Func<Article, bool>> filter = x => x.Id == item.ArticleId;
                await this._articleHelper.UpdateArticleWithProvisionData(filter, item.ArticleQuantity, item.PurchasePrice);

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

        /// <summary>
        /// Valida que la extesion del comprobante sea correcta.
        /// En este caso se admiten pdfs e imagenes.
        /// </summary>
        /// <param name="extension"></param>
        /// <returns></returns>
        public bool ExstensionVoucherIsValid(string extension)
        {
            var validsExtesions = new string[] { "png", "jpeg", "jpg", "webp", "pdf" };

            return validsExtesions.Contains(extension);
        }
    }
}
