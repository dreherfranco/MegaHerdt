using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.API.DTOs.PurchaseArticle
{
    public class PurchaseArticleSerialNumberDTO
    {
        public int Id { get; set; }
        public string? SerialNumber { get; set; }
    }
}
