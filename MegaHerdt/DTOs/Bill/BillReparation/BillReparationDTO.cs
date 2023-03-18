using MegaHerdt.API.DTOs.ReparationPayment;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Bill
{
    public class BillReparationDTO
    {
        public int Id { get; set; }
        public int? ReparationId { get; set; }
        public string Type { get; set; }
        public string SaleNumber { get; set; }
        public string Number { get; set; }
        public List<ReparationPaymentDTO> Payments { get; set; }
    }
}
