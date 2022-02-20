using MegaHerdt.Models.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class Purchase
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string ClientId { get; set; }
        public int BillId { get; set; }
        public DateTime Date { get; set; }
        public Bill Bill { get; set; }
        public List<PurchaseClaim> PurchasesClaims { get; set; }
        public User Client { get; set; }
        public Shipment? Shipment { get; set; }
        public List<PurchaseArticle> PurchasesArticles { get; set; }

    }
}
