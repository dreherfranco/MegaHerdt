namespace MegaHerdt.API.DTOs.PurchaseArticle
{
    public class PurchaseArticleDetailDTO
    {
        public int ArticleId { get; set; }
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public string ArticleName { get; set; }
    }
}
