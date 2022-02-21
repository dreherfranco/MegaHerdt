using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models.PaymentData
{
    public class PurchaseArticleData
    {
        public int ArticleId { get; set; }
        public int ArticleQuantity { get; set; }
        public float ArticlePriceAtTheMoment { get; set; }
        public string ArticleName { get; set; }
    }
}
