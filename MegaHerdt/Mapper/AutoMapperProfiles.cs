﻿using AutoMapper;
using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleBrand;
using MegaHerdt.API.DTOs.ArticleCategory;
using MegaHerdt.API.DTOs.ArticleOffer;
using MegaHerdt.API.DTOs.ArticleProvider;
using MegaHerdt.API.DTOs.Phone;
using MegaHerdt.API.DTOs.Provider;
using MegaHerdt.API.DTOs.Reparation;
using MegaHerdt.API.DTOs.ReparationClaim;
using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;

namespace MegaHerdt.API.Mapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            #region User
            CreateMap<User, UserDTO>()
                .ForMember(x => x.Phones, x => x.MapFrom(this.MapUserPhonesDTO))
                .ForMember(x => x.Addresses, x => x.MapFrom(this.MapUserAddressesDTO))
                .ReverseMap();

            CreateMap<UserCreateDTO, User>()
                .ForMember(x => x.Phones, x => x.MapFrom(this.MapUserPhonesCreation))
                .ForMember(x => x.Addresses, x => x.MapFrom(this.MapUserAddressesCreation))
                .ReverseMap();

            CreateMap<UserUpdateDTO, User>()
                .ForMember(x => x.Phones, x => x.MapFrom(this.MapUserPhonesUpdate))
                .ForMember(x => x.Addresses, x => x.MapFrom(this.MapUserAddressesUpdate));

            CreateMap<UserToken, UserTokenDTO>().ReverseMap();
            CreateMap<UserLoginDTO, User>();
            CreateMap<User, UserDetailDTO>().ReverseMap();
            #endregion User

            #region Address
            CreateMap<AddressCreationDTO, Address>();
            #endregion Address

            #region Reparation
            CreateMap<Reparation, ReparationDTO>()
                .ReverseMap();
            CreateMap<ReparationCreationDTO, Reparation>();
            CreateMap<ReparationUpdateDTO, Reparation>();
            CreateMap<Reparation, ReparationDetailDTO>();
            #endregion Reparation

            #region ReparationState
            CreateMap<ReparationState, ReparationStateDTO>()
                .ReverseMap();
            CreateMap<ReparationStateCreationDTO, ReparationState>();
            #endregion ReparationState

            #region ReparationClaim
            CreateMap<ReparationClaim, ReparationClaimDTO>()
                .ReverseMap();
            CreateMap<ReparationClaimCreationDTO, ReparationClaim>();
            CreateMap<ReparationClaimUpdateDTO, ReparationClaim>();
            #endregion ReparationClaim

            #region ArticleBrand
            CreateMap<ArticleBrand, ArticleBrandDTO>()
                .ReverseMap();
            CreateMap<ArticleBrandCreationDTO, ArticleBrand>();
            #endregion ArticleBrand

            #region ArticleCategory
            CreateMap<ArticleCategory, ArticleCategoryDTO>()
                .ReverseMap();
            CreateMap<ArticleCategoryCreationDTO, ArticleCategory>();
            #endregion ArticleCategory

            #region Article
            CreateMap<Article, ArticleDTO>()
               .ReverseMap();
            CreateMap<ArticleCreationDTO, Article>();
            #endregion Article

            #region ArticleProvider
            CreateMap<ArticleProviderDTO, ArticleProvider>();
            #endregion ArticleProvider

            #region ArticleOffer
            CreateMap<ArticleOffer, ArticleOfferDTO>()
               .ReverseMap();
            CreateMap<ArticleOfferCreationDTO, ArticleOffer>();
            #endregion ArticleOffer

            #region Provider
            CreateMap<Provider, ProviderDTO>()
                .ReverseMap();
            CreateMap<ProviderCreationDTO, Provider>();
            #endregion Provider

        }


        #region UserUtilsMethods
        public List<PhoneDTO> MapUserPhonesDTO(User user, UserDTO userDTO)
        {
            var result = new List<PhoneDTO>();
            if (user.Phones == null) { return result; }

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

        public List<AddressDTO> MapUserAddressesDTO(User user, UserDTO userDTO)
        {
            var result = new List<AddressDTO>();
            if (user.Addresses == null) { return result; }

            foreach (var address in user.Addresses)
            {
                result.Add(
                    new AddressDTO()
                    {
                        Id = address.Id,
                        StreetName = address.StreetName,
                        UserId = address.UserId,
                        StreetNumber = address.StreetNumber,
                        Department = address.Department,
                        PostalCode = address.PostalCode,
                        Province = address.Province,
                        TownName = address.TownName,
                        Floor = address.Floor,
                    });
            }
            return result;
        }

        public List<Phone> MapUserPhonesCreation(UserCreateDTO userCreateDTO, User user)
        {
            var result = new List<Phone>();
            if (userCreateDTO.Phones == null) { return result; }

            foreach (var phone in userCreateDTO.Phones)
            {
                result.Add(
                    new Phone()
                    {
                        Number = phone.Number
                    });
            }
            return result;
        }
        public List<Address> MapUserAddressesCreation(UserCreateDTO userCreateDTO, User user)
        {
            var result = new List<Address>();
            if (userCreateDTO.Addresses == null) { return result; }

            foreach (var address in userCreateDTO.Addresses)
            {
                if (string.IsNullOrWhiteSpace(address.Floor)) { address.Floor = "0"; }

                result.Add(
                    new Address()
                    {
                        StreetName = address.StreetName,
                        StreetNumber = address.StreetNumber,
                        Department = address.Department,
                        PostalCode=address.PostalCode,
                        Province=address.Province,
                        TownName=address.TownName,
                        Floor=address.Floor
                    });
            }
            return result;
        }

        public List<Phone> MapUserPhonesUpdate(UserUpdateDTO userUpdateDTO, User user)
        {
            var result = new List<Phone>();
            if (userUpdateDTO.Phones == null) { return result; }

            foreach (var phone in userUpdateDTO.Phones)
            {
                result.Add(
                    new Phone()
                    {
                        Id = phone.Id,
                        Number = phone.Number,
                        UserId = user.Id
                    });
            }
            return result;
        }

        public List<Address> MapUserAddressesUpdate(UserUpdateDTO userUpdateDTO, User user)
        {
            var result = new List<Address>();
            if (userUpdateDTO.Addresses == null) { return result; }

            foreach (var address in userUpdateDTO.Addresses)
            {
                result.Add(
                    new Address()
                    {
                        Id = address.Id,
                        StreetName = address.StreetName,
                        UserId = user.Id,
                        StreetNumber = address.StreetNumber,
                        Department = address.Department,
                        PostalCode = address.PostalCode,
                        Province = address.Province,
                        TownName = address.TownName,
                        Floor = address.Floor,
                    });
            }
            return result;
        }
        #endregion UserUtilsMethods  

        #region ArticlesUtilsMethods
      /*  private List<ArticleProvider> ArticlesProvidersMap(ArticleCreationDTO articleDTO, Article article)
        {
            var articlesProviders = new List<ArticleProvider>();
            if(articleDTO.Providers == null)
            {
                return articlesProviders;
            }
            foreach(var provider in articleDTO.Providers)
            {
                articlesProviders.Add(new ArticleProvider() { ProviderId = provider.ProviderId });
            }
            return articlesProviders;
        }*/
        #endregion
    }
}

