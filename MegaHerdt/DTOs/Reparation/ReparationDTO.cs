﻿using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.ReparationArticle;
using MegaHerdt.API.DTOs.ReparationClaim;
using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public string ClientDescription { get; set; } = string.Empty;
        public string EmployeeObservation { get; set; } = string.Empty;
        public string Diagnostic { get; set; } = string.Empty;
        public float TotalArticleAmount { get; set; }
        public DateTime ApproximateTime { get; set; }
        public UserDetailDTO Client { get; set; } = null!;
        public UserDetailDTO Employee { get; set; } = null!;
        public ReparationStateDTO ReparationState { get; set; }
        public List<ReparationArticleDTO> ReparationsArticles { get; set; }
        public BillReparationDTO Bill { get; set; }
        public List<ReparationClaimDetailDTO> ReparationsClaims { get; set; }
        public Guid NumeroTicket { get; set; }
        /// <summary>
        /// Indica el 'Tipo de Cosa' que se entregó para reparar por el cliente (impresora, notbook, etc).
        /// </summary>
        public string TipoObjeto { get; set; } = string.Empty;
        public bool Facturada { get; set; }
    }
}
