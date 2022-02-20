using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.PurchaseClaim
{
    public class PurchaseClaimCreationDTO
    {
        [Required]
        public string ClientId { get; set; }
        [Required]
        public int ReparationId { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
