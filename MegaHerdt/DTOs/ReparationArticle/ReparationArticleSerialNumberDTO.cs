using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.API.DTOs.ReparationArticle
{
    public class ReparationArticleSerialNumberDTO
    {
        public int Id { get; set; }
        public string? SerialNumber { get; set; }
    }
}
