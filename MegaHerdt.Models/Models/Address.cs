using MegaHerdt.Models.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public int StreetNumber { get; set; }
        [Required]
        public string Department { get; set; }
        [Required]
        public int PostalCode { get; set; }
        [Required]
        public string Province { get; set; }
        [Required]
        public string TownName { get; set; }
        public string Floor { get; set; } 
        public User User { get; set; }

    }
}
