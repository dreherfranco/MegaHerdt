using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MegaHerdt.Models.Models
{
    public class ArticleProviderSerialNumber
    {
        [Key]
        public int Id { get; set; }
        public string? SerialNumber { get; set; }
        [ForeignKey("ArticleProviderItem")]
        public int ArticleProviderItemId { get; set; }

        /// <summary>
        /// Indica si el numero de serie se encuentra en stock.
        /// </summary>
        public bool EnStock { get; set; } = true;

        /// <summary>
        /// Indica si es una operacion para descontar stock.
        /// Porque tengo que persistir los numeros de serie de la operacion de descuento.
        /// </summary>
        public bool IsDiscountStockOperation { get; set; } = false;
    }
}
