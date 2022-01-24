namespace MegaHerdt.API.DTOs.Article
{
    public class ArticleUpdateImageDTO
    {
        public int Id { get; set; }
        public IFormFile Image { get; set; }
    }
}
