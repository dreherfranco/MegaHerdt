using MegaHerdt.API.DTOs.Reparation;
using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.ReparationClaim
{
    public class ReparationClaimDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public bool Answered { get; set; }
        public ReparationDTO Reparation { get; set; }
    }
}
