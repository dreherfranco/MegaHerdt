using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.ReparationArticle;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationUpdateDTO: ReparationCreationDTO
    {
        public int Id { get; set; }
        public List<ReparationArticleDTO> ReparationsArticles { get; set; }
        public BillReparationDTO Bill { get; set; }
    }
}
