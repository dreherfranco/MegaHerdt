using AutoMapper;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Models.Models;

namespace MegaHerdt.API.Mapper
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            #region User
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserToken, UserTokenDTO>().ReverseMap();
            #endregion User

        }

    }
}
