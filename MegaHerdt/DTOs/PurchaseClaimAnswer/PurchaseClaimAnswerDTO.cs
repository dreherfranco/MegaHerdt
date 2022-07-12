namespace MegaHerdt.API.DTOs.PurchaseClaimAnswer
{
    public class PurchaseClaimAnswerDTO
    {
        public int Id { get; set; }
        public int PurchaseClaimId { get; set; }
        public string Answer { get; set; }
        public string EmployeeUserName { get; set; }
    }
}
