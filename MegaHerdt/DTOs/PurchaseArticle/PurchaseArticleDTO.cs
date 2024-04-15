using MegaHerdt.API.DTOs.Article;
using MegaHerdt.Models.Models;

namespace MegaHerdt.API.DTOs.PurchaseArticle
{
    public class PurchaseArticleDTO
    {
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public ArticleDTO Article { get; set; }

        /// <summary>
        /// Numeros de serie de los articulos comprados.
        /// </summary>
        /// <remarks>
        ///     En la compra se debe descontar el stock 
        ///     y marcarse los numeros de seria ArticleProviderSerialNumber.EnStock = false
        /// </remarks>
        public List<PurchaseArticleSerialNumberDTO> SerialNumbers { get; set; } = new();
    }
}
