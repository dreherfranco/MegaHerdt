using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ReparationArticleSerialNumber
    {
        public ReparationArticleSerialNumber()
        {
                
        }
        public ReparationArticleSerialNumber(string? serialNumber)
        {
            SerialNumber = serialNumber;
        }
        [Key]
        public int Id { get; set; }
        public string? SerialNumber { get; set; }

        [ForeignKey(nameof(ReparationArticle))]
        public int ReparationArticleId { get; set; }
    }
}
