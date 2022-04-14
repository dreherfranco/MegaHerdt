namespace MegaHerdt.API.DTOs.ArticleCategory
{
    public class ArticleCategoryStatisticsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ArticlesQuantity { get; set; }
        public int PurchasesQuantity { get; set; }
    }
}
