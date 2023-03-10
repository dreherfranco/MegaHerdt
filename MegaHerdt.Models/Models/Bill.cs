
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.Models.Models
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        public int? ReparationId { get; set; }
        public int? PurchaseId { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public Reparation? Reparation { get; set; }
        public Purchase? Purchase { get; set; }
        public List<Payment> Payments { get; set; }
    }
}
