﻿using MegaHerdt.API.DTOs.Bill.BillPurchaseDTO;
using MegaHerdt.API.DTOs.PurchaseArticle;
using MegaHerdt.API.DTOs.PurchaseClaim;
using MegaHerdt.API.DTOs.Shipment;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Models.Models;

namespace MegaHerdt.API.DTOs.Purchase
{
    public class PurchaseDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public UserDetailDTO Client { get; set; }
        public ShipmentDTO? Shipment { get; set; }
        public bool PayInPerson { get; set; }
        public PurchaseState State { get; set; } = PurchaseState.Reserved;
        public List<PurchaseArticleDTO> PurchasesArticles { get; set; }
        public List<PurchaseClaimDetailDTO> PurchasesClaims { get; set; }
        public BillPurchaseDTO Bill { get; set; }
    }
}
