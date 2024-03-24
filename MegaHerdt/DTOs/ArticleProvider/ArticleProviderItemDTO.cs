using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleProviderSerialNumber;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderItemDTO
    {
        public int Id { get; set; }

        public ArticleDTO? Article { get; set; } 
        public int ArticleId { get; set; }

        public int ArticleQuantity { get; set; }
        /// <summary>
        /// Precio al cual se compraron los articulos a provisionar.
        /// </summary>
        public float PurchasePrice { get; set; }

        //public ArticleProviderDTO? Provision { get; set; }
        //  REVISAR:
        //  ¿Tiene que ser string o del tipo ArticleProviderSerialNumberDTO? 
        public List<ArticleProviderSerialNumberDTO> SerialNumbers { get; set; } = new();
    }
}
