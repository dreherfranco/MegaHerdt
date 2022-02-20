using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;

namespace MegaHerdt.Models.Models
{
    public class Article
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ArticleBrand")]
        public int BrandId { get; set; }
        [ForeignKey("ArticleCategory")]
        public int CategoryId { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }
        public float UnitValue { get; set; }
        public ArticleBrand Brand { get; set; }
        public ArticleCategory Category { get; set; }
        public List<ArticleOffer> Offers { get; set; }
        public List<ArticleProvider> ArticlesProviders { get; set; }
        public List<ReparationArticle> ReparationArticles { get; set;}
        public List<ReparationArticle> PurchaseArticles { get; set; }
        private int _stock { get; set; }

        public int Stock
        {
            get
            {
                return this._stock;
            }
            set
            {
                this._stock = value;
            }
        }
      
        public void DiscountStock(int value)
        {
            if (this._stock - value < 0)
                throw new Exception("No stock available");

            this._stock -= value;
        }

        public void AddStock(int value)
        {
            this._stock += value;
        }

        public float UnitValueWithOffer
        {
            get
            {
                var dateNow = DateTime.Now;
                var value = UnitValue;
                if (Offers != null)
                {
                    foreach (var offer in Offers)
                    {
                        if (offer.StartDate <= dateNow && offer.EndDate > dateNow)
                        {
                            var discount = (offer.DiscountPercentage * UnitValue) / 100;
                            value = value - discount;
                        }
                    }
                }
                return value;
            }
        }

        public IEnumerable<ArticleOffer> FutureOffers()
        {
            var dateNow = DateTime.Now;
            return Offers.Where(x => x.StartDate > dateNow);
        }

        public IEnumerable<ArticleOffer> CurrentsOffers()
        {
            var dateNow = DateTime.Now;
            return Offers.Where(x => x.StartDate <= dateNow && x.EndDate > dateNow);
        }

    }
}
