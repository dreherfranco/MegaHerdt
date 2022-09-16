using System.ComponentModel.DataAnnotations;


namespace MegaHerdt.Models.Models
{
    public class ReparationState
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool Enabled { get; set; } = true;
        public List<Reparation> Reparations { get; set; }
    }
}
