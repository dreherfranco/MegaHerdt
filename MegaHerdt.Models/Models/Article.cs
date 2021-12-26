using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string Code { get; set; }
        public string Name { get; set; }
        public float UnitValue { get; set; }
        public ArticleBrand Brand { get; set; }
        public ArticleCategory Category { get; set; }
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
    }
}
