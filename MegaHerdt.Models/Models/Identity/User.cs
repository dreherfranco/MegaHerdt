using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.Models.Models.Identity
{
    public class User : IdentityUser
    {
        [Required]
        public string Dni { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public List<Phone> Phones { get; set; }
    }
}
