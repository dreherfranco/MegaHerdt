namespace MegaHerdt.API.DTOs.User
{
    public class UserDetailDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Dni { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastLogin { get; set; }
        public bool IsActive { get; set; }
    }
}
