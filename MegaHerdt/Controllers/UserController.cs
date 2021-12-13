using AutoMapper;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
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

        // POST: api/<UserController>
        [HttpPost]
        public async Task<ActionResult<UserTokenDTO>> Post([FromBody] UserDTO userDTO)
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
    }
}
