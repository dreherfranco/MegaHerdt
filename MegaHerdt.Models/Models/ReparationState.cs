using System.ComponentModel.DataAnnotations;


namespace MegaHerdt.Models.Models
{
    public class ReparationState
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool Enabled { get; set; } = true;
        public List<Reparation> Reparations { get; set; }
    }

    /// <summary>
    /// Clase creada para representar los ids de los estados de las reparaciones para que no se hardcodeen.
    /// Es una clase provisoria, se va a reemplazar mas adelante.
    /// </summary>
    public static class ReparationStatesValues
    {
        public const int INGRESO = 1;
        public const int EN_REVISION = 2;
        public const int EN_PRESUPUESTO = 3;
        public const int EN_REPARACION = 4;
        public const int REPARADO = 5;
        public const int PAGADO = 6;
        public const int ENTREGADO = 7;
        public const int CANCELADO = 8;
    }
}
