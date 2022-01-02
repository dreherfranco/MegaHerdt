using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ReparationArticle
{
    public class ReparationArticleCreationDTO
    {
        [Required]
        public int ArticleId { get; set; }
        [Required]
        public int ArticleQuantity { get; set; }
    }
}
