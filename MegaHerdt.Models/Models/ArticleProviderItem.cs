using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public partial class ArticleProviderItem
    {
        [Key]
        public int Id { get; set; }

        public Article Article { get; set; } = null!;
        [ForeignKey(nameof(Article))]
        public int ArticleId { get; set; }

        public int ArticleQuantity { get; set; }
        /// <summary>
        /// Precio al cual se compraron los articulos a provisionar.
        /// </summary>
        public float PurchasePrice { get; set; }

        public ArticleProvider Provision { get; set; } = null!;
        [ForeignKey(nameof(Provision))]
        public int ProvisionId { get; set; }

        public List<ArticleProviderSerialNumber>? SerialNumbers { get; set; }

    }

    public partial class ArticleProviderItem
    {
        /// <summary>
        /// Articulo para validaciones
        /// </summary>
        [NotMapped]
        public Article? _articleConfiguration;

        [NotMapped]
        public List<ArticleProviderSerialNumber>? _serialNumbersPersisted;

        [NotMapped]
        public List<string> ErrorMessages { get; set; } = new();
        public bool IsBroken()
        {
            if (_articleConfiguration is null) 
            { 
                ErrorMessages.Add("No se agregó configuración para la entidad ArticleProviderItem.");
                return ErrorMessages.Any();
            }
          
            //Define si el articulo tiene numero de serie
            if (_articleConfiguration.HasSerialNumber)
            {
                if (SerialNumbers is null)
                {
                    ErrorMessages.Add("No contiene numeros de serie definidos.");
                }
                else
                {
                    if (SerialNumbers.Count != ArticleQuantity)
                    {
                        ErrorMessages.Add($"Cantidad de numeros de series no coincidentes con la cantidad de articulos. Numeros de articulos = {ArticleQuantity} y Numeros de serie definidos = {SerialNumbers.Count}");
                    }

                    if(_serialNumbersPersisted is not null)
                    {
                        foreach(var serialNumber in SerialNumbers)
                        {
                            foreach(var serialNumberPersisted in _serialNumbersPersisted)
                            {
                                if(serialNumber.SerialNumber!.Equals(serialNumberPersisted.SerialNumber) && serialNumber.IsDiscountStockOperation == serialNumberPersisted.IsDiscountStockOperation)
                                {
                                    ErrorMessages.Add($"El número de serie {serialNumber.SerialNumber} definido en el artículo {_articleConfiguration.Name} ya existe en la base de datos.");
                                }
                            }
                        }
                    }
                }
            }


            return ErrorMessages.Any();
        }
    }
}
