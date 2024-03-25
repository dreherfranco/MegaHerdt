using MegaHerdt.API.DTOs.ArticleProviderSerialNumber;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderCreationDTO
    {
        public int? ProviderId { get; set; }
        public DateTime ProvisionDate { get; set; } = DateTime.UtcNow;
        public bool Add { get; set; }
        public string DiscountReason { get; set; } = string.Empty;
        public List<ArticleProviderItemDTO> ArticlesItems { get; set; } = null!;
    }
}
