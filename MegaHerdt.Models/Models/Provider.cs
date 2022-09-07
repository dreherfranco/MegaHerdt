using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.Models.Models
{
    public class Provider
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public bool Enabled { get; set; } = true;
        public List<ArticleProvider> ArticlesProviders { get; set; }
    }
}
