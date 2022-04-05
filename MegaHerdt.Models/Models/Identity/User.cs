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
        public bool Enabled { get; set; } = true;
        public List<Phone> Phones { get; set; }
        public List<Address> Addresses { get; set; }
        public List<Reparation> ClientReparations { get; set; }
        public List<Reparation> EmployeeReparations { get; set; }
        public List<ReparationClaim> ReparationsClaims { get; set; }
    }
}
