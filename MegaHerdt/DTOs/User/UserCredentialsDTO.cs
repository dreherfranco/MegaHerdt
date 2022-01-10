using MegaHerdt.API.DTOs.Role;

namespace MegaHerdt.API.DTOs.User
{
    public class UserCredentialsDTO
    {
        public UserTokenDTO UserToken { get; set; }
        public UserDetailDTO User { get; set; }
        public List<string> Roles { get; set; }

    }
}
