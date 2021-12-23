using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class Article
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ArticleBrand")]
        public int BrandId { get; set; }
        [ForeignKey("ArticleCategory")]
        public int CategoryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string UnitValue { get; set; }
        public int Stock { get; set; }
        public ArticleBrand Brand { get; set; }
        public ArticleCategory Category { get; set; }
    }
}
