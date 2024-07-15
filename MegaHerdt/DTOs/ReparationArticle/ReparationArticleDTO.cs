using MegaHerdt.API.DTOs.PurchaseArticle;

namespace MegaHerdt.API.DTOs.ReparationArticle
{
    public class ReparationArticleDTO
    {
        public int ArticleId { get; set; }
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public string ArticleName { get; set; }
        /// <summary>
        /// Numeros de serie de los articulos comprados.
        /// </summary>
        /// <remarks>
        ///     En la compra se debe descontar el stock 
        ///     y marcarse los numeros de seria ArticleProviderSerialNumber.EnStock = false
        /// </remarks>
        public List<ReparationArticleSerialNumberDTO> SerialNumbers { get; set; } = new();
    }
}
