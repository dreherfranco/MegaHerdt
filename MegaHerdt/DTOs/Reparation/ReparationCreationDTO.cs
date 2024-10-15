using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.ReparationArticle;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationCreationDTO
    {
        public int ReparationStateId { get; set; }
        public string EmployeeId { get; set; }
        public string ClientId { get; set; }
        public DateTime Date { get; set; }
        public string ClientDescription { get; set; }
        public string EmployeeObservation { get; set; } = string.Empty;
        /// <summary>
        /// Indica el 'Tipo de Cosa' que se entregó para reparar por el cliente (impresora, notbook, etc).
        /// </summary>
        public string TipoObjeto { get; set; } = string.Empty;
        //public BillReparationCreationDTO Bill { get; set; }
    }
}
