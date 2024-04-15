using MegaHerdt.Models.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public enum PurchaseState
    {
        Reserved = 0,
        CancelledReservation = 1,
        Paid = 2,
        Delivered = 3
    }

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
        public bool PayInPerson { get; set; }
        public PurchaseState State { get; set; } = PurchaseState.Reserved;
        public Shipment? Shipment { get; set; }
        public List<PurchaseArticle> PurchasesArticles { get; set; }

        public float TotalArticleAmount
        {
            get
            {
                float total = 0;

                foreach (var purchaseArticle in PurchasesArticles)
                {
                    total += purchaseArticle.ArticlePriceAtTheMoment;
                }
                return total;
            }
        }

    }
}
