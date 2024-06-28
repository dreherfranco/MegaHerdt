using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Article
{
    public class ArticleUpdateDTO
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        public float UnitValue { get; set; }
        public bool HasSerialNumber { get; set; }
        public int Stock { get; set; }
    }
}
