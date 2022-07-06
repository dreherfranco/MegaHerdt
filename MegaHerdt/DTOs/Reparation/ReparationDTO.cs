using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.ReparationArticle;
using MegaHerdt.API.DTOs.ReparationClaim;
using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public string ClientDescription { get; set; }
        public string EmployeeObservation { get; set; }
        public float TotalArticleAmount { get; set; }
        public UserDetailDTO Client { get; set; }
        public UserDetailDTO Employee { get; set; }
        public ReparationStateDTO ReparationState { get; set; }
        public List<ReparationArticleDTO> ReparationsArticles { get; set; }
        public BillReparationDTO Bill { get; set; }
        public List<ReparationClaimDetailDTO> ReparationsClaims { get; set; }
    }
}
