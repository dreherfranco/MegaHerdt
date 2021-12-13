using AutoMapper;
using MegaHerdt.API.DTOs.User;
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AuthHelper AuthHelper;
        private readonly IConfiguration Configuration;
        private readonly IMapper Mapper;
        public UserController(AuthHelper authHelper, IConfiguration configuration, IMapper mapper)
        {
            this.AuthHelper = authHelper;
            this.Configuration = configuration;
            this.Mapper = mapper;
        }
        // POST: api/<UserController>
        [HttpPost]
        public async Task<ActionResult<UserToken>> Post([FromBody] UserDTO userDTO)
        {
            try
            {
               var user = Mapper.Map<User>(userDTO);
                var userToken= await this.AuthHelper.CreateUser(user, Configuration["jwt:key"]);
                return userToken;
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
