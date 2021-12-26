using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.Phone;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.User
{
    public class UserCreateDTO
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Dni { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<PhoneCreationDTO> Phones { get; set; }
        public List<AddressCreationDTO> Addresses { get; set; }
    }
}
