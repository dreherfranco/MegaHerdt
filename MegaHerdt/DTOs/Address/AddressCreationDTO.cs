using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Address
{
    public class AddressCreationDTO
    {
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
    }
}
