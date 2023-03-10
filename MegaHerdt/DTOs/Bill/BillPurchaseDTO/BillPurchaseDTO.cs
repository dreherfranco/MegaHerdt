using MegaHerdt.API.DTOs.PurchasePayment;

namespace MegaHerdt.API.DTOs.Bill.BillPurchaseDTO
{
    public class BillPurchaseDTO
    {
        public int Id { get; set; }
        public int? PurchaseId { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public List<PurchasePaymentDTO> Payments { get; set; }
    }
}
