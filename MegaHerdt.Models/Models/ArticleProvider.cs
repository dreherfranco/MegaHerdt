
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ArticleProvider
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Provider))]
        public int ProviderId { get; set; }

        public string Voucher { get; set; } = string.Empty;
        public DateTime ProvisionDate { get; set; }
        public bool Add { get; set; } = true;
        public string DiscountReason { get; set; } = string.Empty;
        public List<ArticleProviderItem> ArticlesItems { get; set; } = new();
        public bool Enabled { get; set; } = true;
        public Provider Provider { get; set; } = null!;
    }
}
