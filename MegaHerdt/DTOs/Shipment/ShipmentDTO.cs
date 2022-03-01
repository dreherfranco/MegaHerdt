using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.TransportCompany;

namespace MegaHerdt.API.DTOs.Shipment
{
    public class ShipmentDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime ShipmentDate { get; set; }
        public int TrackingNumber { get; set; }
        public AddressDTO Address { get; set; }
        public TransportCompanyDTO? TransportCompany { get; set; }
    }
}
