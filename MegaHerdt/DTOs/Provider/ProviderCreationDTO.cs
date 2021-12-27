using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Provider
{
    public class ProviderCreationDTO
    {
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}
