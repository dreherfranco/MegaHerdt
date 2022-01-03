using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models
{
    public class PaymentMethod
    {
        public int Id { get; set; }
        public string Tag { get; set; }
        public string Service { get; set; }
        public int PayDays { get; set; }
        [Range (0,100)]
        public int Commission { get; set; }
        [Range(0, 100)]
        public int ClientInterest { get; set; }
        public string PriceType { get; set; }
        public DateTime StartValidity { get; set; }
        public DateTime EndValidity { get; set; }
        public List<Payment> Payments { get; set; }

    }
}
