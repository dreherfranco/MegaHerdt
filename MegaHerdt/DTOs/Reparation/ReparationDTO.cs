using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationDTO
    {
        public int Id { get; set; }
        public int ReparationStateId { get; set; }
        public string EmployeeId { get; set; }
        public string ClientId { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public UserDTO Client { get; set; }
        public UserDTO Employee { get; set; }
        public ReparationStateDTO ReparationState { get; set; }
    }
}
