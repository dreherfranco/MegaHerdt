using AutoMapper;
using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Services.Services;
using MegaHerdt.Services.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService UserService;
        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;
        private readonly HashService hashService;
        private readonly IMailerService mailService;

        public UsersController(UserService userService, IConfiguration configuration,
            IMapper mapper, HashService hashService, IMailerService mailService)
        {
            this.Configuration = configuration;
            this.Mapper = mapper;
            this.UserService = userService;
            this.hashService = hashService;
            this.mailService = mailService;
        }

        [HttpGet("get-users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<List<UserDetailDTO>>> GetAll(/*[FromQuery] PaginationDTO paginationDTO*/)
        {
            try
            {
                var users = this.UserService.Get().ToList();
                // await HttpContext.InsertParametersPagination(usersQueryable, paginationDTO.RecordsPerPage);
                // var entity = await usersQueryable.Paginate(paginationDTO).ToListAsync();
                return Mapper.Map<List<UserDetailDTO>>(users);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("get-user/{email}")]
        public ActionResult<UserDTO> GetByEmail(string email)
        {
            try
            {
                var usersDTO = Mapper.Map<UserDTO>(this.UserService.GetByEmail(email));
                return usersDTO;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPost("create")]
        public async Task<ActionResult<UserTokenDTO>> CreateUser([FromBody] UserCreateDTO userDTO)
        {
            try
            {
                userDTO.Password = hashService.Hash(userDTO.Password);
                
                var user = Mapper.Map<User>(userDTO);
                user.UserName = userDTO.Email;
                var userToken = await this.UserService.CreateUser(user, Configuration["jwt:key"]);
                return Mapper.Map<UserTokenDTO>(userToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserCredentialsDTO>> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            try
            {
                var user = Mapper.Map<User>(userLoginDTO);
                user.Password = hashService.Hash(userLoginDTO.Password);
                var userToken = await this.UserService.Login(user, Configuration["jwt:key"]);
                var userTokenDTO = Mapper.Map<UserTokenDTO>(userToken);
                var userDTO = this.Mapper.Map<UserDetailDTO>(this.UserService.GetByEmail(user.Email));
                var roles = await this.UserService.GetUserRoles(user.Email);

                return new UserCredentialsDTO()
                {
                  User = userDTO,
                  UserToken = userTokenDTO,
                  Roles = roles
                };
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //INGRESAR CONTRASEÑA PARA ACTUALIZAR
        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<UserCredentialsDTO>> UserUpdate([FromBody] UserUpdateDTO userUpdateDTO)
        {
            try
            {
                var userDb = this.UserService.GetByEmail(userUpdateDTO.Email);
                userUpdateDTO.Password = hashService.Hash(userUpdateDTO.Password);
                if (userUpdateDTO.Password == userDb.Password && UserValidations.UserEmailIsOk(userUpdateDTO.Email, HttpContext))
                {
                    var user = Mapper.Map(userUpdateDTO, userDb);
                    user.UserName = userUpdateDTO.Email;
                    var userToken = await this.UserService.UserUpdate(user, Configuration["jwt:key"]);
                    var userTokenDTO = Mapper.Map<UserTokenDTO>(userToken);
                    var userDTO = this.Mapper.Map<UserDetailDTO>(this.UserService.GetByEmail(user.Email));
                    var roles = await this.UserService.GetUserRoles(user.Email);

                    return new UserCredentialsDTO()
                    {
                        User = userDTO,
                        UserToken = userTokenDTO,
                        Roles = roles
                    };
                }
                return BadRequest(new { message = "enter password or email correctly to update" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{userEmail}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<bool>> UserDelete(string userEmail)
        {
            try
            {    
                if (UserValidations.UserEmailIsOk(userEmail, HttpContext))
                {
                    await UserService.UserDelete(userEmail);
                    return true;
                }
                throw new Exception("User email is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("change-password")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<UserTokenDTO>> ChangePassword([FromBody] UserChangePasswordDTO userChangePasswordDTO)
        {
            try
            {
                if (UserValidations.UserEmailIsOk(userChangePasswordDTO.Email, HttpContext))
                {
                    var currentPassword = hashService.Hash(userChangePasswordDTO.CurrentPassword);
                    var newPassword = hashService.Hash(userChangePasswordDTO.NewPassword);

                    var userToken = await this.UserService.ChangePassword(userChangePasswordDTO.Email, currentPassword, newPassword, Configuration["jwt:key"]);
                    return Mapper.Map<UserTokenDTO>(userToken);                    
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("address/add/{userEmail}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<UserTokenDTO>> AddAddress([FromBody] AddressCreationDTO addressCreationDTO,string userEmail)
        {
            try
            {
                if (UserValidations.UserEmailIsOk(userEmail, HttpContext))
                {
                    var userDb = UserService.GetByEmail(userEmail);
                    var address = Mapper.Map<Address>(addressCreationDTO);
                    userDb.Addresses.Add(address);
                    var userToken = await this.UserService.UserUpdate(userDb, Configuration["jwt:key"]);
                    return Mapper.Map<UserTokenDTO>(userToken);
                }
                throw new Exception("User email is incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("forget-password")]
        public async Task<ActionResult<UserTokenDTO>> ForgetPassword([FromBody] UserForgetPasswordDTO userForgetPasswordDTO)
        {
            try
            {
               var user = this.UserService.GetByEmail(userForgetPasswordDTO.Email);
                if (user != null)
                {
                    var newPassword = PasswordGenerator.GenerateRandomPassword();
                    var newPasswordHashed = hashService.Hash(newPassword);

                    var userToken = await this.UserService.ChangeForgotPassword(userForgetPasswordDTO.Email, newPasswordHashed, Configuration["jwt:key"]);
                    
                    var mailRequest = this.UserService.SendPasswordToMail(userForgetPasswordDTO.Email, newPassword);
                    await this.mailService.SendEmailAsync(mailRequest);
                    return Mapper.Map<UserTokenDTO>(userToken);
                }

                return BadRequest("user doesn't exists");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
