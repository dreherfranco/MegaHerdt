using MegaHerdt.API.DTOs.Pagination;

namespace MegaHerdt.API.DTOs.Article
{
    public class ArticleFilterDTO
    {
        public int Page { get; set; } = 1;
        public int RecordsPerPage { get; set; } = 10;
        public PaginationDTO Pagination
        {
            get
            {
                return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage };
            }
        }

        public int BrandId { get; set; } = 0;
        public int CategoryId { get; set; } = 0;
        public string Name { get; set; } = "";

    }
}
