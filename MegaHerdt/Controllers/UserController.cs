using AutoMapper;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly AuthHelper AuthHelper;
        private readonly UserService UserService;
        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;
        public UserController(/*AuthHelper authHelper,*/ UserService userService, IConfiguration configuration, IMapper mapper)
        {
            //this.AuthHelper = authHelper;
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
                //var userToken= await this.AuthHelper.CreateUser(user, Configuration["jwt:key"]);
                var userToken = await this.UserService.CreateUser(user, Configuration["jwt:key"]);
                return Mapper.Map<UserTokenDTO>(userToken);
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
