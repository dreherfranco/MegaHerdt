﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class PurchaseArticle
    {
        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        [Required]
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public Article Article { get; set; } = null!;
        /// <summary>
        /// Numeros de serie de los articulos comprados.
        /// </summary>
        /// <remarks>
        ///     En la compra se debe descontar el stock 
        ///     y marcarse los numeros de seria ArticleProviderSerialNumber.EnStock = false
        /// </remarks>
        public List<PurchaseArticleSerialNumber> SerialNumbers { get; set; } = new();
        public Purchase Purchase { get; set; } = null!;
    }
}
