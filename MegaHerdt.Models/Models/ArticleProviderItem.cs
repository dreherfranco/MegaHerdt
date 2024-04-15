using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public partial class ArticleProviderItem
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

    public partial class ArticleProviderItem
    {
        [NotMapped]
        public List<string> ErrorMessages { get; set; } = new();
        public bool IsBroken()
        {
            if (SerialNumbers is null)
            {
                ErrorMessages.Add("No contiene numeros de serie definidos.");
            }
            else
            {
                if(SerialNumbers.Count != ArticleQuantity)
                {
                    ErrorMessages.Add($"Cantidad de numeros de series no coincidentes con la cantidad de articulos. Numeros de articulos = { ArticleQuantity } y Numeros de serie definidos = { SerialNumbers.Count }");
                }
            }


            return ErrorMessages.Any();
        }
    }
}
