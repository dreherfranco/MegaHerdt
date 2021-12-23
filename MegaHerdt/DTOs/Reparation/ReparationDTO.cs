﻿using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.DTOs.User;

namespace MegaHerdt.API.DTOs.Reparation
{
    public class ReparationDTO
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public UserDetailDTO Client { get; set; }
        public UserDetailDTO Employee { get; set; }
        public ReparationStateDTO ReparationState { get; set; }
    }
}
