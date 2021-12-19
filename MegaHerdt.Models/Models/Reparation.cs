
using MegaHerdt.Models.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class Reparation
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ReparationState")]
        public int ReparationStateId { get; set; }
        [ForeignKey("User")]
        public string EmployeeId { get; set; }
        [ForeignKey("User")]
        public string ClientId { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public ReparationState ReparationState { get; set; }
        public User Client { get; set; }
        public User Employee { get; set; }
    }
}
