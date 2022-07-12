using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class PurchaseClaimAnswer
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("PurchaseClaim")]
        public int PurchaseClaimId { get; set; }
        public string Answer { get; set; }
        public string EmployeeUserName { get; set; }
        public PurchaseClaim PurchaseClaim { get; set; }
    }
}
