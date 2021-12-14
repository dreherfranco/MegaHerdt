using MegaHerdt.API.DTOs.Phone;

namespace MegaHerdt.API.DTOs.User
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Dni { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<PhoneDTO> Phones { get; set; }
    }
}
