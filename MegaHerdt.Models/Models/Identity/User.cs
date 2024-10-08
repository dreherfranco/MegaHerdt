using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public bool IsActive { get; set; } = true;
        public DateTime LastLogin { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Phone> Phones { get; set; }
        public List<Address> Addresses { get; set; }
        public List<Reparation> ClientReparations { get; set; }
        public List<Reparation> EmployeeReparations { get; set; }
        public List<ReparationClaim> ReparationsClaims { get; set; }

        /// <summary>
        /// Indica la cantidad de compras por usuario.
        /// No se persiste en la BDD.
        /// </summary>
        [NotMapped]
        public int PurchasesCount { get; set; } = 0;
        
        [NotMapped]
        public int ReparationsCount { get; set; } = 0;
    }
}
