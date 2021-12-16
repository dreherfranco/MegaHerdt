using Microsoft.EntityFrameworkCore;

namespace MegaHerdt.API.ExtensionMethods
{
    public static class HttpContextExtensions
    {
        public async static Task InsertParametersPagination<T>(this HttpContext httpContext,
                                                               IQueryable<T> queryable,
                                                               int recordsPerPage)
        {
            double quantity = await queryable.CountAsync();
            double quantityPages = Math.Ceiling(quantity / recordsPerPage);
            httpContext.Response.Headers.Add("quantityPages", quantityPages.ToString());
        }
    }
}
