using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models
{
    public class Purchase
    {
        [Key]
        public int Id { get; set; }
        public int BillId { get; set; }
        public DateTime Date { get; set; }
        public Bill Bill { get; set; }

    }
}
