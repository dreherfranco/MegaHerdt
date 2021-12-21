using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.ReparationClaim
{
    public class ReparationClaimCreationDTO
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
