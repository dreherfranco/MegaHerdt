﻿using Microsoft.AspNetCore.Identity;

namespace MegaHerdt.Models.Models
{
    public class User : IdentityUser
    {
        public string Dni { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
