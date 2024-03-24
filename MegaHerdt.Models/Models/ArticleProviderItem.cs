using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ArticleProviderItem
    {
        [Key]
        public int Id { get; set; }

        public Article Article { get; set; } = null!;
        [ForeignKey(nameof(Article))]
        public int ArticleId { get; set; }

        public int ArticleQuantity { get; set; }
        /// <summary>
        /// Precio al cual se compraron los articulos a provisionar.
        /// </summary>
        public float PurchasePrice { get; set; }

        public ArticleProvider Provision { get; set; } = null!;
        [ForeignKey(nameof(Provision))]
        public int ProvisionId { get; set; }

        public List<ArticleProviderSerialNumber>? SerialNumbers { get; set; }

    }
}
