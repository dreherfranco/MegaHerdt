namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationUpdateBudgetDTO
    {
        public int Id { get; set; }
        public bool IsAccepted { get; set; }
        public DateTime ApproximateTime { get; set; }
    }
}
