namespace MegaHerdt.API.DTOs.User
{
    public class UserChangePasswordDTO
    {
        public string UserName { get; set; }
        public string NewPassword { get; set; }
        public string CurrentPassword { get; set; }

    }
}
