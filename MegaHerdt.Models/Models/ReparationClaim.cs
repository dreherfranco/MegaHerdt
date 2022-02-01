using MegaHerdt.Models.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class ReparationClaim
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string ClientId { get; set; }
        [ForeignKey("Reparation")]
        public int ReparationId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public bool Answered { get; set; } = false;
        public User Client { get; set; }
        public Reparation Reparation { get; set; }
    }
}
