using MegaHerdt.API.DTOs.Bill;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationUpdateDTO: ReparationCreationDTO
    {
        public int Id { get; set; }
        public BillReparationDTO Bill { get; set; }
    }
}
