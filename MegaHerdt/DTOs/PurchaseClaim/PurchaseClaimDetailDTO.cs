namespace MegaHerdt.API.DTOs.PurchaseClaim
{
    public class PurchaseClaimDetailDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public bool Answered { get; set; }
    }
}
