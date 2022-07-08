using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.ReparationArticle;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationUpdateDTO: ReparationCreationDTO
    {
        public int Id { get; set; }
        public List<ReparationArticleUpdateDTO> ReparationsArticles { get; set; }
        public int Amount { get; set; }
        public string EmployeeObservation { get; set; }
        public DateTime ApproximateTime { get; set; }
        // public BillReparationDTO Bill { get; set; }
    }
}
