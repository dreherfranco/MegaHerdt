
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ReparationClaimAnswer
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ReparationClaim")]
        public int ReparationClaimId { get; set; }
        public string Answer { get; set; }
        public string EmployeeUserName { get; set; }
        public ReparationClaim ReparationClaim { get; set; }
    }
}
