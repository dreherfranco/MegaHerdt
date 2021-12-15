using AutoMapper;
using MegaHerdt.API.DTOs.Role;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService UserService;
        private readonly RoleService RoleService;
        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;
        private readonly HashService hashService;
        public UserController(UserService userService, IConfiguration configuration,
            IMapper mapper, HashService hashService, RoleService roleService)
        {
            this.Configuration = configuration;
            this.Mapper = mapper;
            this.UserService = userService;
            this.RoleService = roleService;
            this.hashService = hashService;
        }

        //HACER PAGINACIOOOOOON
        [HttpGet("get-users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public ActionResult<List<UserDTO>> GetAll(/*[FromQuery] PaginationDTO paginationDTO*/)
        {
            try
            {
                var usersDTO = Mapper.Map<List<UserDTO>>(this.UserService.Get());
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
        // POST: api/<UserController>
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

        [HttpGet("get-roles")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
        public async Task<ActionResult<List<string>>> GetRoles()
        {
            try
            {
                return await this.RoleService.GetRoles();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        #region Roles
        [HttpPost("create-role")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
        public async Task<ActionResult> CreateRole([FromBody] CreateRoleDTO roleDTO)
        {
            try
            {
                var createRole = await this.RoleService.CreateRole(roleDTO.RoleName);
                if (!string.IsNullOrWhiteSpace(createRole))
                {
                    return NoContent();
                }
                throw new Exception("Role didn't be assigned");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("assign-role")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
        public async Task<ActionResult> AssignRole([FromBody] EditRoleDTO roleDTO)
        {
            try
            {
                var assignRole = await this.RoleService.AssignRole(roleDTO.RoleName, roleDTO.UserEmail);
                if (assignRole)
                {
                    return NoContent();
                }
                throw new Exception("Role didn't be assigned");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("remove-role-to-user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
        public async Task<ActionResult> RemoveRoleToUser([FromBody] EditRoleDTO roleDTO)
        {
            try
            {
                var removeRole = await this.RoleService.RemoveRoleToUser(roleDTO.RoleName, roleDTO.UserEmail);
                if (removeRole)
                {
                    return NoContent();
                }
                throw new Exception("Role didn't be removed");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("delete-role")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
        public async Task<ActionResult> DeleteRole([FromBody] DeleteRoleDTO roleDTO)
        {
            try
            {
                await this.RoleService.DeleteRole(roleDTO.RoleName); 
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion Roles
    }
}
