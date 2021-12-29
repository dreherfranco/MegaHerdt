using MegaHerdt.API.DTOs.ArticleBrand;
using MegaHerdt.API.DTOs.ArticleCategory;
using MegaHerdt.API.DTOs.ArticleOffer;
using MegaHerdt.API.DTOs.ArticleProvider;

namespace MegaHerdt.API.DTOs.Article
{
    public class ArticleDetailDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public float UnitValue { get; set; }
        public int Stock { get; set; }
        public float UnitValueWithOffer { get; set; }
        public ArticleBrandDTO Brand { get; set; }
        public ArticleCategoryDTO Category { get; set; }
        public List<ArticleProviderDetailDTO> ArticlesProviders { get; set; }
        public List<ArticleOfferDetailDTO> Offers { get; set; }
    }
}
