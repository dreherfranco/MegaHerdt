namespace MegaHerdt.API.DTOs.ArticleProviderSerialNumber
{
    public class ArticleProviderSerialNumberDTO
    {
        public int Id { get; set; }
        public string ?SerialNumber { get; set; }
        public bool EnStock { get; set; } = true;
    }
}
