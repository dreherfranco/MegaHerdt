
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
        public int BillId { get; set; }
        [Required]
        public int Amount { get; set; } //LABOR COSTS
        [Required]
        public DateTime Date { get; set; }
        public string ClientDescription { get; set; }
        public string EmployeeObservation { get; set; }
        public DateTime ApproximateTime { get; set; }
        public ReparationState ReparationState { get; set; }
        public User Client { get; set; }
        public User Employee { get; set; }
        public List<ReparationClaim> ReparationsClaims { get; set; }
        public List<ReparationArticle> ReparationsArticles { get; set; }
        public Bill Bill { get; set; }

        public float TotalArticleAmount
        {
            get
            {
                float total = 0;
                foreach(var reparationArticle in ReparationsArticles)
                {
                    total += reparationArticle.ArticlePriceAtTheMoment;
                }
                return total;
            }
        }
    }
}
