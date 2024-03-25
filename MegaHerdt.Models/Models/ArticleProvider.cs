
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaHerdt.Models.Models
{
    public partial class ArticleProvider
    {
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

                //if (string.IsNullOrEmpty(Voucher))
                //{
                //    ErrorMessages.Add("El comprobante es obligatorio.");
                //}

            }

            return ErrorMessages.Any();
        }
    }
}
