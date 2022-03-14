namespace MegaHerdt.API.DTOs.ReparationClaim
{
    public class ReparationClaimDetailDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public bool Answered { get; set; }
    }
}
