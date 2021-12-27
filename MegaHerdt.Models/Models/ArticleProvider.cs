
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ArticleProvider
    {
        [ForeignKey("Provider")]
        public int ProviderId { get; set; }
        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        public string Voucher { get; set; }
        public DateTime ProvisionDate { get; set; }
        public int ArticleQuantity { get; set; }
        public Provider Provider { get; set; }
        public Article Article { get; set; }
    }
}
