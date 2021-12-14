using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.Models.Models.Identity
{
    public class User : IdentityUser
    {
        public string Dni { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
