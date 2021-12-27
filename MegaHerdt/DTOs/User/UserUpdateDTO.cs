using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.Phone;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.User
{
    public class UserUpdateDTO
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Dni { get; set; }
        [Required]
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<PhoneUpdateDTO> Phones { get; set; }
        public List<AddressUpdateDTO> Addresses { get; set; }
    }
}
