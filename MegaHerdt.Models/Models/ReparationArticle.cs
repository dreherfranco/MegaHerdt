using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models
{
    public class ReparationArticle
    {
        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        [ForeignKey("Reparation")]
        public int ReparationId { get; set; }
        [Required]
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public Article Article { get; set; }
        public Reparation Reparation { get; set; }

        /// <summary>
        /// Numeros de serie de los articulos comprados.
        /// </summary>
        /// <remarks>
        ///     En la compra se debe descontar el stock 
        ///     y marcarse los numeros de seria ArticleProviderSerialNumber.EnStock = false
        /// </remarks>
        public List<ReparationArticleSerialNumber> SerialNumbers { get; set; } = new();

    }
}
