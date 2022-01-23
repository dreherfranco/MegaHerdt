
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Article
{
    public class ArticleCreationDTO
    {
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public float UnitValue { get; set; }
        public int Stock { get; set; }
        public IFormFile Image { get; set; }
    }
}
