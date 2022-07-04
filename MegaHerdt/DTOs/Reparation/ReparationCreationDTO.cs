using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.ReparationArticle;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationCreationDTO
    {
        public int ReparationStateId { get; set; }
        public string EmployeeId { get; set; }
        public string ClientId { get; set; }
     //   public int Amount { get; set; }
        public DateTime Date { get; set; }
       // public List<ReparationArticleCreationDTO> ReparationsArticles { get; set; }
      //  public BillReparationCreationDTO Bill { get; set; }
    }
}
