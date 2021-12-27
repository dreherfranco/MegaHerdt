using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleOffer
{
    public class ArticleOfferDTO
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        [Range(0, 1)]
        public float DiscountPercentage { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
    }
}
