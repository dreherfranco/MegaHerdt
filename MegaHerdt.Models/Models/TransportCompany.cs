
namespace MegaHerdt.Models.Models
{
    public class TransportCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public bool Enabled { get; set; } = true;
        public List<Shipment> Shipments { get; set; }
    }
}
