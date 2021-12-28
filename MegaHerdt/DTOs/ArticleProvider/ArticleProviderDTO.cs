using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderDTO
    {
        [Required]
        public int ProviderId { get; set; }
        [Required]
        public int ArticleId { get; set; }
        public string Voucher { get; set; }
        public DateTime ProvisionDate { get; set; }
        public int ArticleQuantity { get; set; }
    }
}
