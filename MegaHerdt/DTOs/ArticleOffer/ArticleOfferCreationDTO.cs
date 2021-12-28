using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleOffer
{
    public class ArticleOfferCreationDTO
    {
        public int ArticleId { get; set; }
        [Range(0, 100)]
        public int DiscountPercentage { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
    }
}
