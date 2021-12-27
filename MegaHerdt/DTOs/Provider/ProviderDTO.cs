using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Provider
{
    public class ProviderDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}
