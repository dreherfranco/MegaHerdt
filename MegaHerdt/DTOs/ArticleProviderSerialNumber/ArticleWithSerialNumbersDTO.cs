using MegaHerdt.API.DTOs.Article;

namespace MegaHerdt.API.DTOs.ArticleProviderSerialNumber
{
    public class ArticleWithSerialNumbersDTO
    {
        public ArticleWithSerialNumbersDTO() { }
        public ArticleWithSerialNumbersDTO(ArticleDTO article, List<string> serialNumbers)
        {
            Article = article;
            SerialNumbers = serialNumbers;
        }
        public ArticleDTO Article { get; set; } = null!;
        public string DiscountReason { get; set; } = string.Empty;
        public int? QuantityToDiscount { get; set; } 
        public List<string> SerialNumbers { get; set; } = new();
    }
}
