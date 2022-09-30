using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Models.Models.IncomeExpensesData
{
    public class ReparationIncomeExpenses
    {
        public List<ArticleDetail> Articles { get; set; } = new List<ArticleDetail>();
        public int Amount { get; set; } = 0;
        public ClientDetail Client { get; set; }
        public float TotalIncomePaidByReparation { get; set; } = 0;
        public int PaymentsMade { get; set; } = 0;
        public int TotalPayments { get; set; } = 0;
    }
}
