using AutoMapper;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;

namespace MegaHerdt.API.Mapper
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            #region User
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserCreateDTO>().ReverseMap();
            CreateMap<UserToken, UserTokenDTO>().ReverseMap();
            CreateMap<UserLoginDTO, User>();
            #endregion User

        }

    }
}
