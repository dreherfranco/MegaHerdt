using AutoMapper;
using MegaHerdt.API.DTOs.Pagination;
using MegaHerdt.API.DTOs.Role;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.API.ExtensionMethods;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService UserService;
        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;
        private readonly HashService hashService;
        public UserController(UserService userService, IConfiguration configuration,
            IMapper mapper, HashService hashService)
        {
            this.Configuration = configuration;
            this.Mapper = mapper;
            this.UserService = userService;
            this.hashService = hashService;
        }

        [HttpGet("get-users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<List<UserDTO>>> GetAll([FromQuery] PaginationDTO paginationDTO)
        {
            try
            {
                var usersQueryable = this.UserService.Get();
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
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
                var userToken = await this.UserService.CreateUser(user, Configuration["jwt:key"]);
                return Mapper.Map<UserTokenDTO>(userToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDTO>> Login([FromBody] UserLoginDTO userDTO)
        {
            try
            {
                userDTO.Password = hashService.Hash(userDTO.Password);
                var user = Mapper.Map<User>(userDTO);

                var userToken = await this.UserService.Login(user, Configuration["jwt:key"]);
                return Mapper.Map<UserTokenDTO>(userToken);
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
                if (userDTO.Password == userDb.Password)
                {
                    var user = Mapper.Map(userDTO, userDb);
                    var userToken = await this.UserService.UserUpdate(user, Configuration["jwt:key"]);
                    return Mapper.Map<UserTokenDTO>(userToken);
                }
                return BadRequest(new { message = "enter password correctly to update" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        
    }
}
