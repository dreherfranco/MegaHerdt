using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.API.DTOs.Address
{
    public class AddressDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string StreetName { get; set; }
        public int StreetNumber { get; set; }
        public string Department { get; set; }
        public int PostalCode { get; set; }
        public string Province { get; set; }
        public string TownName { get; set; }
        public string Floor { get; set; }
    }
}
