
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public partial class ArticleProvider
    {
        public ArticleProvider() { }
        public ArticleProvider(string discountReason, DateTime provisionDate, List<ArticleProviderItem> articlesItems, bool add = false)
        {
            Add = add;
            DiscountReason = discountReason;
            ProvisionDate = provisionDate;
            ArticlesItems = articlesItems;
        }

        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Provider))]
        public int? ProviderId { get; set; }

        public string Voucher { get; set; } = string.Empty;
        public DateTime ProvisionDate { get; set; }
        public bool Add { get; set; } = true;
        public string DiscountReason { get; set; } = string.Empty;
        public List<ArticleProviderItem> ArticlesItems { get; set; } = new();
        public bool Enabled { get; set; } = true;
        public Provider? Provider { get; set; } 
    }

    public partial class ArticleProvider
    {
        [NotMapped]
        public List<string> ErrorMessages { get; set; } = new();
        public bool IsBroken()
        {
            if (Add)
            {
                if(ProviderId == 0 || ProviderId is null)
                {
                    ErrorMessages.Add("El proveedor es obligatorio.");
                }

                if (!ArticlesItems.Any())
                {
                    ErrorMessages.Add("La provisión debe contener al menos un ítem.");
                }
                else
                {
                    foreach (var item in ArticlesItems) 
                    {
                        // Si se rompe una regla de negocio de ArticleProviderItem se agrega
                        // a los mensajes de error de la entidad padre.
                        if (item.IsBroken())
                        {
                            ErrorMessages.AddRange(item.ErrorMessages);
                        }
                    }
                }
            }

            return ErrorMessages.Any();
        }
    }
}
