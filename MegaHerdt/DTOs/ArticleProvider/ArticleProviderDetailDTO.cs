﻿using MegaHerdt.API.DTOs.Provider;

namespace MegaHerdt.API.DTOs.ArticleProvider
{
    public class ArticleProviderDetailDTO
    {
        public string Voucher { get; set; }
        public DateTime ProvisionDate { get; set; }
        public int ArticleQuantity { get; set; }
        public ProviderDTO Provider { get; set; }
    }
}