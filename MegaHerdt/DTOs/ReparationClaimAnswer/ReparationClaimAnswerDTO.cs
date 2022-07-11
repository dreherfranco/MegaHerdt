namespace MegaHerdt.API.DTOs.ReparationClaimAnswer
{
    public class ReparationClaimAnswerDTO
    {
        public int Id { get; set; }
        public int ReparationClaimId { get; set; }
        public string Answer { get; set; }
        public string EmployeeUserName { get; set; }
    }
}
