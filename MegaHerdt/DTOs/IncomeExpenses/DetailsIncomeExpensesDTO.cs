namespace MegaHerdt.API.DTOs.IncomeExpenses
{
    public class DetailsIncomeExpensesDTO
    {
        public List<IncomeExpensesDTO> IncomeExpenses { get; set; }
        /// <summary>
        /// Monto total de ingresos o egresos.
        /// </summary>
        public float Total { get; set; }
    }
}
