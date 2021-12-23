using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationDetailDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public UserDetailDTO Client { get; set; }
        public UserDetailDTO Employee { get; set; }
    }
}
