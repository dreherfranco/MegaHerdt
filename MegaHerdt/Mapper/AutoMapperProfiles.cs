using AutoMapper;
using MegaHerdt.API.DTOs.Phone;
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
            CreateMap<User, UserDTO>().ForMember(x => x.Phones, x => x.MapFrom(this.MapUserPhonesDTO)).ReverseMap();
            CreateMap<UserCreateDTO, User>()
                .ForMember(x => x.Phones, x => x.MapFrom(this.MapUserPhonesCreation));
            CreateMap<UserUpdateDTO, User>();
            CreateMap<UserToken, UserTokenDTO>().ReverseMap();
            CreateMap<UserLoginDTO, User>();
            #endregion User

        }

        private List<PhoneDTO> MapUserPhonesDTO(User user, UserDTO userDTO)
        {
            var result = new List<PhoneDTO>();
            if (userDTO == null) { return result; }

            foreach (var phone in user.Phones)
            {
                result.Add(
                    new PhoneDTO()
                    {
                        Id = phone.Id,
                        Number = phone.Number,
                        UserId = phone.UserId
                    });
            }
            return result;
        }

        private List<Phone> MapUserPhonesCreation(UserCreateDTO userCreateDTO, User user)
        {
            var result = new List<Phone>();
            if (userCreateDTO == null) { return result; }

            foreach (var phone in userCreateDTO.Phones)
            {
                result.Add(
                    new Phone() { 
                    Number = phone.Number
                });
            }
            return result;
        }
    }
}
