using AutoMapper;
using MegaHerdt.API.DTOs.Address;
using MegaHerdt.API.DTOs.Pagination;
using MegaHerdt.API.DTOs.Role;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.API.ExtensionMethods;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
        public UsersController(UserService userService, IConfiguration configuration,
            IMapper mapper, HashService hashService)
        {
            this.Configuration = configuration;
            this.Mapper = mapper;
            this.UserService = userService;
            this.hashService = hashService;
        }

        [HttpGet("get-users")]
      //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
       // [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<List<UserDTO>>> GetAll([FromQuery] PaginationDTO paginationDTO)
        {
            try
            {
                var usersQueryable = this.UserService.Get().AsQueryable();
                await HttpContext.InsertParametersPagination(usersQueryable, paginationDTO.RecordsPerPage);

                var entity = await usersQueryable.Paginate(paginationDTO).ToListAsync();
                var usersDTO = Mapper.Map<List<UserDTO>>(entity);
                return usersDTO;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("get-user/{email}")]
     //   [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
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
        public async Task<ActionResult<UserTokenDTO>> UserUpdate([FromBody] UserUpdateDTO userDTO)
        {
            try
            {
                var userDb = this.UserService.GetByEmail(userDTO.Email);
                userDTO.Password = hashService.Hash(userDTO.Password);
                if (userDTO.Password == userDb.Password && UserValidations.UserEmailIsOk(userDTO.Email, HttpContext))
                {
                    var user = Mapper.Map(userDTO, userDb);
                    user.UserName = userDTO.Email;
                    var userToken = await this.UserService.UserUpdate(user, Configuration["jwt:key"]);
                    return Mapper.Map<UserTokenDTO>(userToken);
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
        public async Task<ActionResult> UserDelete(string userEmail)
        {
            try
            {    
                if (UserValidations.UserEmailIsOk(userEmail, HttpContext))
                {
                    await UserService.UserDelete(userEmail);
                    return NoContent();
                }
                throw new Exception("User email is incorrect");
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
    }
}
