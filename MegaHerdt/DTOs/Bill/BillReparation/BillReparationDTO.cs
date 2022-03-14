using MegaHerdt.API.DTOs.ReparationPayment;

namespace MegaHerdt.API.DTOs.Bill
{
    public class BillReparationDTO
    {
        public int Id { get; set; }
        public int ReparationId { get; set; }
        public string Type { get; set; }
        public int Number { get; set; }
        public List<ReparationPaymentDTO> Payments { get; set; }
    }
}
