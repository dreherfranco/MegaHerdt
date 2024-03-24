using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderUpdateDTO
    {
        public int Id { get; set; }
        [Required]
        public int ProviderId { get; set; }
        //[Required]
       // public int ArticleId { get; set; }
        public DateTime ProvisionDate { get; set; }
      //  public int ArticleQuantity { get; set; }
    }
}
