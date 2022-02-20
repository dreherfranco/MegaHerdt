using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class PurchaseArticle
    {
        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        [Required]
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public Article Article { get; set; }
        public Purchase Purchase { get; set; }
    }
}
