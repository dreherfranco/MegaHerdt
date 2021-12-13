
namespace MegaHerdt.Models.Models.Identity
{
    public class UserToken
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
