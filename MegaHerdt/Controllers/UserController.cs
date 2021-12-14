using AutoMapper;
using MegaHerdt.API.DTOs.User;
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
        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;
        public UserController(UserService userService, IConfiguration configuration, IMapper mapper)
        {
            this.Configuration = configuration;
            this.Mapper = mapper;
            this.UserService = userService;
        }

        //HACER PAGINACIOOOOOON
        [HttpGet("get-users")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        public ActionResult<List<UserDTO>> Get(/*[FromQuery] PaginationDTO paginationDTO*/)
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

        // POST: api/<UserController>
        [HttpPost("create")]
        public async Task<ActionResult<UserTokenDTO>> CreateUser([FromBody] UserCreateDTO userDTO)
        {
            try
            {
               var user = Mapper.Map<User>(userDTO);
                var userToken = await this.UserService.CreateUser(user, Configuration["jwt:key"]);
                return Mapper.Map<UserTokenDTO>(userToken);
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDTO>> Login([FromBody] UserLoginDTO userDTO)
        {
            try
            {
                var user = Mapper.Map<User>(userDTO);

                var userToken = await this.UserService.Login(user, Configuration["jwt:key"]);
                return Mapper.Map<UserTokenDTO>(userToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("get-roles")]
        public async Task<ActionResult<List<string>>> GetRoles()
        {
            try
            {
                return await this.UserService.GetRoles();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            
        }

        [HttpPost("create-role")]
        public async Task<ActionResult> CreateRole([FromBody] CreateRoleDTO roleDTO)
        {
            try
            {
                var createRole = await this.UserService.CreateRole(roleDTO.RoleName);
                if (createRole.Succeeded)
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
        public async Task<ActionResult> AssignRole([FromBody] EditRoleDTO roleDTO)
        {
            try
            {
                var assignRole = await this.UserService.AssignRole(roleDTO.RoleName, roleDTO.UserEmail);
                if (assignRole)
                {
                    return NoContent();
                }
                throw new Exception("Role didn't be assigned");
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("remove-role")]
        public async Task<ActionResult> RemoveRole([FromBody] EditRoleDTO roleDTO)
        {
            try
            {
                var removeRole = await this.UserService.RemoveRole(roleDTO.RoleName, roleDTO.UserEmail);
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
    }
}
