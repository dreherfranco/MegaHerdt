using System.ComponentModel.DataAnnotations;


namespace MegaHerdt.Models.Models
{
    public class ReparationState
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Reparation> Reparations { get; set; }
    }
}
