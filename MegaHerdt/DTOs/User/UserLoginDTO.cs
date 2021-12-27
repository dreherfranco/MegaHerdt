using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.User
{
    public class UserLoginDTO
    {
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
