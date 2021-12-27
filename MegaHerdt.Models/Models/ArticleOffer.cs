using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ArticleOffer
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        [Range(0,1)]
        public float DiscountPercentage { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public Article Article { get; set; }
        
    }
}
