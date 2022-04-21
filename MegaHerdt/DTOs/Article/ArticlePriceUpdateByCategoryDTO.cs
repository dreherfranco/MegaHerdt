using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Article
{
    public class ArticlePriceUpdateByCategoryDTO
    {
        public int CategoryId { get; set; }
        [Range(1,100)]
        public int PricePercentage { get; set; }
    }
}
