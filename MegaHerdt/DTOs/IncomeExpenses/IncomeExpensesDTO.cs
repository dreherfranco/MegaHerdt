namespace MegaHerdt.API.DTOs.IncomeExpenses
{
    public class IncomeExpensesDTO
    {
        public List<ArticleDetailDTO> Articles { get; set; } = new List<ArticleDetailDTO>();
        /// <summary>
        /// Monto de mano de obra
        /// </summary>
        public int AmountOfLabor { get; set; } = 0;
        public ClientDetailDTO Client { get; set; }
        /// <summary>
        /// Monto total de cuotas pagadas. Por Ej: se pagaron 4 cuotas de 10.000, entonces TotalIncomePaidByReparation = 40.000
        /// </summary>
        public float TotalIncomePaidByReparation { get; set; } = 0;
        /// <summary>
        /// Cantidad de pagos efectuados.
        /// </summary>
        public int PaymentsMade { get; set; } = 0;
        /// <summary>
        /// Cantidad de pagos totales.
        /// </summary>
        public int TotalPayments { get; set; } = 0;
    }
}
