using MegaHerdt.Models.Models.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class PurchaseClaim
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string ClientId { get; set; }
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public bool Answered { get; set; } = false;
        public User Client { get; set; }
        public Purchase Purchase { get; set; }
        public List<PurchaseClaimAnswer> Answers { get; set; }
    }
}
