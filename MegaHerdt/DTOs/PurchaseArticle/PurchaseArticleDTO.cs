using MegaHerdt.API.DTOs.Article;

namespace MegaHerdt.API.DTOs.PurchaseArticle
{
    public class PurchaseArticleDTO
    {
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public ArticleDTO Article { get; set; }
    }
}
