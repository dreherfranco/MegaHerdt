using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderUpdateDTO
    {
        public int Id { get; set; }
        public int? ProviderId { get; set; }
        public DateTime ProvisionDate { get; set; } = DateTime.UtcNow;
    }
}
