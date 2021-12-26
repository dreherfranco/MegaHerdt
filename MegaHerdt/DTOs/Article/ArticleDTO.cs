using MegaHerdt.API.DTOs.ArticleBrand;
using MegaHerdt.API.DTOs.ArticleCategory;

namespace MegaHerdt.API.DTOs.Article
{
    public class ArticleDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public float UnitValue { get; set; }
        public ArticleBrandDTO Brand { get; set; }
        public ArticleCategoryDTO Category { get; set; }
    }
}
