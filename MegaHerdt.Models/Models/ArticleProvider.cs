
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ArticleProvider
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Provider")]
        public int ProviderId { get; set; }
        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        public string Voucher { get; set; }
        public DateTime ProvisionDate { get; set; }
        public int ArticleQuantity { get; set; }
        public bool Add { get; set; } = true;
        public string DiscountReason { get; set; }
        public List<ArticleProviderSerialNumber> ?SerialNumbers { get; set; }
        public bool Enabled { get; set; } = true;
        public Provider Provider { get; set; }
        public Article Article { get; set; }
    }
}
