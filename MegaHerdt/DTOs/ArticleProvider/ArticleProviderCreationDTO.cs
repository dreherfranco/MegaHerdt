using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderCreationDTO
    {
        [Required]
        public int ProviderId { get; set; }
        [Required]
        public int ArticleId { get; set; }
        public IFormFile Voucher { get; set; }
        public DateTime ProvisionDate { get; set; }
        public int ArticleQuantity { get; set; }
        public bool Add { get; set; }
    }
}
