using AutoMapper;
using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleBrand;
using MegaHerdt.API.DTOs.ArticleCategory;
using MegaHerdt.API.DTOs.ArticleOffer;
using MegaHerdt.API.DTOs.ArticleProvider;
using MegaHerdt.API.DTOs.ArticleProviderSerialNumber;
using MegaHerdt.API.DTOs.Bill;
using MegaHerdt.API.DTOs.Bill.BillPurchaseDTO;
using MegaHerdt.API.DTOs.IncomeExpenses;
using MegaHerdt.API.DTOs.Phone;
using MegaHerdt.API.DTOs.Provider;
using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.DTOs.PurchaseArticle;
using MegaHerdt.API.DTOs.PurchaseClaim;
using MegaHerdt.API.DTOs.PurchaseClaimAnswer;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.API.DTOs.Reparation;
using MegaHerdt.API.DTOs.ReparationArticle;
using MegaHerdt.API.DTOs.ReparationClaim;
using MegaHerdt.API.DTOs.ReparationClaimAnswer;
using MegaHerdt.API.DTOs.ReparationPayment;
using MegaHerdt.API.DTOs.ReparationState;
using MegaHerdt.API.DTOs.Shipment;
using MegaHerdt.API.DTOs.TransportCompany;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Models.Models.IncomeExpensesData;
using MegaHerdt.Models.Models.PaymentData;

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
            CreateMap<Address, AddressDTO>()
                .ReverseMap();
            #endregion Address

            #region Reparation
            CreateMap<Reparation, ReparationDTO>()
                .ForMember(x => x.ReparationsArticles, x => x.MapFrom(this.ReparationArticleMap))
                .ReverseMap();
            CreateMap<ReparationCreationDTO, Reparation>()
                .ForMember(x=>x.ReparationsArticles, x=>x.MapFrom(this.ReparationArticleCreationMap));
            CreateMap<ReparationUpdateDTO, Reparation>()
                 .ForMember(x => x.ReparationsArticles, x => x.MapFrom(this.ReparationArticleUpdateMap));
            CreateMap<Reparation, ReparationDetailDTO>();

            CreateMap<Reparation, ReparationDebtDTO>()
               .ForMember(dest => dest.Total, opt => opt.MapFrom(src => (src.TotalArticleAmount + src.Amount)))
               .ForMember(dest => dest.ClientUserName, opt => opt.MapFrom(src => src.Client.UserName))
               .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.Name))
               .ForMember(dest => dest.ClientSurname, opt => opt.MapFrom(src => src.Client.Surname))
               .ForMember(dest => dest.ClientDni, opt => opt.MapFrom(src => src.Client.Dni))
               .ReverseMap();
            #endregion Reparation

            #region ReparationState
            CreateMap<ReparationState, ReparationStateDTO>()
                .ReverseMap();
            CreateMap<ReparationStateCreationDTO, ReparationState>();
            #endregion ReparationState

            #region ReparationClaim
            CreateMap<ReparationClaim, ReparationClaimDTO>()
                .ReverseMap();
            CreateMap<ReparationClaimCreationDTO, ReparationClaim>()
                .ReverseMap();
            CreateMap<ReparationClaimUpdateDTO, ReparationClaim>();
            CreateMap<ReparationClaim, ReparationClaimDetailDTO>();
            #endregion ReparationClaim

            #region ReparationClaimAnswer
            CreateMap<ReparationClaimAnswerCreationDTO, ReparationClaimAnswer>();
            CreateMap<ReparationClaimAnswerDTO, ReparationClaimAnswer>()
                .ReverseMap();
            #endregion ReparationClaimAnswer

            #region Bill
            CreateMap<Bill, BillReparationDTO>()
                .ReverseMap();
            CreateMap<BillReparationCreationDTO, Bill>();

            CreateMap<Bill, BillPurchaseDTO>()
                .ReverseMap();
            #endregion Bill

            #region ArticleBrand
            CreateMap<ArticleBrand, ArticleBrandDTO>()
                .ReverseMap();
            CreateMap<ArticleBrandCreationDTO, ArticleBrand>();
            CreateMap<ArticleBrand, ArticleBrandStatisticsDTO>()
                .ForMember(x => x.Id, x => x.MapFrom(y => y.Id))
                .ForMember(x => x.Name, x => x.MapFrom(y => y.Name))
                .ForMember(x => x.ArticlesQuantity, x => x.MapFrom(y => y.Articles.Count))
                .ForMember(x => x.PurchasesQuantity, x => x.MapFrom(this.BrandPurchasesQuantityMap))
                .ForMember(x => x.ReparationsQuantity, x => x.MapFrom(this.BrandReparationsQuantityMap));
            #endregion ArticleBrand

            #region ArticleCategory
            CreateMap<ArticleCategory, ArticleCategoryDTO>()
                .ReverseMap();
            CreateMap<ArticleCategoryCreationDTO, ArticleCategory>();
            CreateMap<ArticleCategory, ArticleCategoryStatisticsDTO>()
                .ForMember(x => x.Id, x=>x.MapFrom(y => y.Id))
                .ForMember(x => x.Name, x => x.MapFrom(y => y.Name))
                .ForMember(x => x.ArticlesQuantity, x => x.MapFrom(y => y.Articles.Count))
                .ForMember(x => x.PurchasesQuantity, x => x.MapFrom(this.CategoryPurchasesQuantityMap))
                .ForMember(x => x.ReparationsQuantity, x => x.MapFrom(this.CategoryReparationsQuantityMap));
            #endregion ArticleCategory

            #region Article
            CreateMap<Article, ArticleDTO>()
                .ForMember(x=>x.CurrentsOffers, x=>x.MapFrom(this.CurrentsOffersMap))
                .ForMember(x => x.FutureOffers, x => x.MapFrom(this.FutureOffersMap))
               .ReverseMap();
            CreateMap<ArticleCreationDTO, Article>()
                .ForMember(opt=>opt.Image, opt=> opt.Ignore());
            CreateMap<ArticleUpdateDTO, Article>()
                .ForMember(opt => opt.Image, opt => opt.Ignore());
            CreateMap<Article, DTOs.Article.ArticleDetailDTO>();
            CreateMap<Article, ArticleNameDTO>();
            #endregion Article

            #region ArticleProvider
            CreateMap<ArticleProviderCreationDTO, ArticleProvider>();
            CreateMap<ArticleProviderUpdateDTO, ArticleProvider>();
            CreateMap<ArticleProvider, ArticleProviderDetailDTO>();
            CreateMap<ArticleProvider, ArticleProviderDTO>();

            CreateMap<ArticleProviderItemDTO, ArticleProviderItem>().ReverseMap();
            //  .ForMember(x => x.SerialNumbers, x => x.MapFrom(this.MapArticleProviderSerialNumber));
            #endregion ArticleProvider

            #region ArticleProviderSerialNumber
            CreateMap<ArticleProviderSerialNumber, ArticleProviderSerialNumberDTO>()
                .ReverseMap();
            #endregion ArticleProviderSerialNumber

            #region ArticleOffer
            CreateMap<ArticleOffer, ArticleOfferDTO>()
               .ReverseMap();
            CreateMap<ArticleOfferCreationDTO, ArticleOffer>();
            CreateMap<ArticleOffer, ArticleOfferDetailDTO>();
            #endregion ArticleOffer

            #region Provider
            CreateMap<Provider, ProviderDTO>()
                .ReverseMap();
            CreateMap<ProviderCreationDTO, Provider>();
            #endregion Provider

            #region ReparationPayment
            CreateMap<ReparationPaymentMPDTO, ReparationPaymentMP>();

            CreateMap<Payment, ReparationPaymentDTO>()
                .ReverseMap();
            #endregion ReparationPayment

            #region Purchase
            CreateMap<Purchase, PurchaseDTO>()
               .ReverseMap();
            CreateMap<Purchase, PurchaseDebtDTO>()
               .ForMember(dest => dest.Total, opt=>opt.MapFrom(src => src.TotalArticleAmount))
               .ForMember(dest => dest.ClientUserName, opt => opt.MapFrom(src => src.Client.UserName))
               .ReverseMap();
            #endregion Purchase

            #region PurchaseClaim
            CreateMap<PurchaseClaim, PurchaseClaimDTO>()
               .ReverseMap();
            CreateMap<PurchaseClaimCreationDTO, PurchaseClaim>()
                .ReverseMap();
            CreateMap<PurchaseClaimUpdateDTO, PurchaseClaim>();
            CreateMap<PurchaseClaim, PurchaseClaimDetailDTO>();
            #endregion PurchaseClaim

            #region PurchaseClaimAnswer
            CreateMap<PurchaseClaimAnswerCreationDTO, PurchaseClaimAnswer>();
            CreateMap<PurchaseClaimAnswerDTO, PurchaseClaimAnswer>()
                .ReverseMap();
            #endregion PurchaseClaimAnswer

            #region PurchaseArticle
            CreateMap<PurchaseArticleDetailDTO, PurchaseArticleData>();

            CreateMap<PurchaseArticle, PurchaseArticleDTO>();
            #endregion PurchaseArticle

            #region PurchasePayment
           // CreateMap<PurchasePaymentConfirmDTO, PurchasePaymentData>();

            //MERCADO PAGO
            CreateMap<PurchasePaymentMPDTO, PurchasePaymentMP>();
            CreateMap<PurchasePaymentPayerMPDTO, PurchasePaymentPayerMP>();
            CreateMap<PurchasePaymentPayerIdentificationMPDTO, PurchasePaymentPayerIdentificationMP>();

            CreateMap<Payment, ReparationPaymentDTO>()
                .ReverseMap();
            CreateMap<Payment, PurchasePaymentDTO>()
                .ReverseMap();
            #endregion PurchasePayment

            #region TransportCompany
            CreateMap<TransportCompany, TransportCompanyDTO>()
                .ReverseMap();
            CreateMap<TransportCompanyCreationDTO, TransportCompany>();
            #endregion TransportCompany

            #region Shipment
            CreateMap<Shipment, ShipmentDTO>();
            CreateMap<ShipmentUpdateDTO, Shipment>();
            #endregion Shipment

            #region IncomeExpenses
            CreateMap<ArticleDetail, DTOs.IncomeExpenses.ArticleDetailDTO>();
            CreateMap<ClientDetail, ClientDetailDTO>();
            CreateMap<IncomeExpenses, IncomeExpensesDTO>()
                .ForMember(dest => dest.AmountOfLabor, opt => opt.MapFrom(src => src.Amount));
            #endregion IncomeExpenses

        }


        #region ArticleProvider
        //public List<ArticleProviderSerialNumber> MapArticleProviderSerialNumber(ArticleProviderItemDTO ArticleProviderCreationDTO, ArticleProviderItem ArticleProvider)
        //{
        //    var result = new List<ArticleProviderSerialNumber>();
        //    if (ArticleProviderCreationDTO.SerialNumbers == null) { return result; }
        //    if (ArticleProviderCreationDTO.SerialNumbers != null && ArticleProviderCreationDTO.SerialNumbers[0] == null) { return result; }

        //    foreach (var serialNumber in ArticleProviderCreationDTO.SerialNumbers)
        //    {
        //        result.Add(
        //            new ArticleProviderSerialNumber()
        //            {
        //                SerialNumber = serialNumber,
        //                ArticleProviderItemId = ArticleProvider.Id
        //            });
        //    }
        //    return result;
        //}
        #endregion ArticleProvider

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

        #region ReparationUtilsMethods
        private List<ReparationArticleDTO> ReparationArticleMap(Reparation reparation, ReparationDTO reparationDTO)
        {
            var result = new List<ReparationArticleDTO>();
            if (reparation.ReparationsArticles == null) { return result; }

            foreach (var reparationArticle in reparation.ReparationsArticles)
            {
                result.Add(
                    new ReparationArticleDTO()
                    {
                        ArticleQuantity = reparationArticle.ArticleQuantity,
                        ArticleId = reparationArticle.ArticleId,
                        ArticlePriceAtTheMoment = reparationArticle.ArticlePriceAtTheMoment,
                        ArticleName = reparationArticle.Article.Name
                    });
            }
            return result;
        }

        private List<ReparationArticle> ReparationArticleCreationMap(ReparationCreationDTO reparationDTO, Reparation reparation)
        {
            return new List<ReparationArticle>();
        }

        private List<ReparationArticle> ReparationArticleUpdateMap(ReparationUpdateDTO reparationDTO, Reparation reparation)
        {
            var result = new List<ReparationArticle>();
            if (reparationDTO.ReparationsArticles == null) { return result; }

            foreach (var reparationArticle in reparationDTO.ReparationsArticles)
            {
                result.Add(
                    new ReparationArticle()
                    {
                        ArticleQuantity = reparationArticle.ArticleQuantity,
                        ArticleId = reparationArticle.ArticleId
                    });
            }
            return result;
        }

        #endregion ReparationUtilsMethods

        #region ArticleUtilsMethods
        public List<ArticleOfferDetailDTO> FutureOffersMap(Article article, ArticleDTO articleDTO)
        {
            var result = new List<ArticleOfferDetailDTO>();
            if (article.Offers == null) { return result; }

            var futureOffers = article.FutureOffers().ToList();

            foreach (var offer in futureOffers)
            {
                result.Add(new ArticleOfferDetailDTO()
                {
                    DiscountPercentage = offer.DiscountPercentage,
                    Id = offer.Id,
                    EndDate = offer.EndDate,
                    StartDate = offer.StartDate
                });
            }
            return result;
        }

        public List<ArticleOfferDetailDTO> CurrentsOffersMap(Article article, ArticleDTO articleDTO)
        {
            var result = new List<ArticleOfferDetailDTO>();
            if (article.Offers == null) { return result; }

            var currentsOffers = article.CurrentsOffers().ToList();

            foreach(var offer in currentsOffers)
            {
                result.Add(new ArticleOfferDetailDTO() 
                { 
                    DiscountPercentage = offer.DiscountPercentage,
                    Id = offer.Id,
                    EndDate = offer.EndDate,
                    StartDate = offer.StartDate
                });
            }
            return result;
        }
        #endregion ArticleUtilsMethods

        #region PurchasesQuantity
        public int BrandPurchasesQuantityMap(ArticleBrand articleBrand, ArticleBrandStatisticsDTO articleBrandStatisticsDTO)
        {
            var sum = 0;
            foreach(var article in articleBrand.Articles)
            {
                foreach (var purchaseArticle in article.PurchaseArticles)
                {
                    sum += purchaseArticle.ArticleQuantity;
                }
            }
            return sum;
        }

        public int CategoryPurchasesQuantityMap(ArticleCategory articleCategory, ArticleCategoryStatisticsDTO articleCategoryStatisticsDTO)
        {
            var sum = 0;
            foreach (var article in articleCategory.Articles)
            {
                foreach (var purchaseArticle in article.PurchaseArticles)
                {
                    sum += purchaseArticle.ArticleQuantity;
                }
            }
            return sum;
        }

        public int CategoryReparationsQuantityMap(ArticleCategory articleCategory, ArticleCategoryStatisticsDTO articleCategoryStatisticsDTO)
        {
            var sum = 0;
            foreach (var article in articleCategory.Articles)
            {
                foreach (var reparationArticle in article.ReparationArticles)
                {
                    sum += reparationArticle.ArticleQuantity;
                }
            }
            return sum;
        }

        public int BrandReparationsQuantityMap(ArticleBrand articleBrand, ArticleBrandStatisticsDTO articleBrandStatisticsDTO)
        {
            var sum = 0;
            foreach (var article in articleBrand.Articles)
            {
                foreach (var reparationArticle in article.ReparationArticles)
                {
                    sum += reparationArticle.ArticleQuantity;
                }
            }
            return sum;
        }

        #endregion
    }
}

