using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleProviderSerialNumber;
using MegaHerdt.API.DTOs.Provider;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderDTO
    {
        public int Id { get; set; }
       // public ArticleNameDTO Article { get; set; }
        public string Voucher { get; set; } = string.Empty;
        public DateTime ProvisionDate { get; set; }
      //  public int ArticleQuantity { get; set; }
        public bool Add { get; set; }
        public string DiscountReason { get; set; }
        //  public List<ArticleProviderSerialNumberDTO> SerialNumbers { get; set; }
        public List<ArticleProviderItemDTO> ArticlesItems { get; set; } = new();
        public ProviderDTO Provider { get; set; } = null!;
    }
}
