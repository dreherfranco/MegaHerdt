namespace MegaHerdt.API.DTOs.IncomeExpenses
{
    public class IncomeExpensesDTO
    {
        public List<ArticleDetailDTO> Articles { get; set; } = new List<ArticleDetailDTO>();
        public int AmountOfLabor { get; set; } = 0;
        public ClientDetailDTO Client { get; set; }
        public float TotalIncomePaidByReparation { get; set; } = 0;
        public int PaymentsMade { get; set; } = 0;
        public int TotalPayments { get; set; } = 0;
    }
}
