using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models
{
    public class Payment
    {
        public int Id { get; set; }
        [ForeignKey("PaymentMethod")]
        public int PaymentMethodId { get; set; }
        public float Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        [Range (0,100)]
        public int Tax { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

    }
}
