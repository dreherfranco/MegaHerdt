
using MegaHerdt.Models.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MegaHerdt.Models.Models
{
    public class Phone
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [Required]
        public string Number { get; set; }
        public User User { get; set; }
        
    }
}
