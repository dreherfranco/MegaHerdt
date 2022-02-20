
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public class Shipment
    {
        [Key]
        public int Id { get; set; }     
        [ForeignKey("Address")]
        public int AddressId { get; set; }
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        [ForeignKey("TransportCompany")]
        public int? TransportCompanyId { get; set; }
        public float Amount { get; set; }
        public DateTime ShipmentDate { get; set; }
        public int TrackingNumber { get; set; }
        public Purchase Purchase { get; set; }
        public Address Address { get; set; }
        public TransportCompany? TransportCompany { get; set; }

    }
}
