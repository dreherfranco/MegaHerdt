using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MegaHerdt.Models.Models
{
    public class ArticleProviderSerialNumber
    {
        [Key]
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        [ForeignKey("ArticleProvider")]
        public int ArticleProviderId { get; set; }
    }
}
