using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class PurchaseArticleSerialNumber
    {
        [Key]
        public int Id { get; set; }
        public string? SerialNumber { get; set; }
        [ForeignKey(nameof(PurchaseArticle))]
        public int PurchaseArticleId { get; set; }
    }
}
