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
    //    private readonly UserManager<User> userManager;
        public UserController(/*UserManager<User> userManager,*/AuthHelper authHelper, IConfiguration configuration)
        {
            this.AuthHelper = authHelper;
            this.Configuration = configuration;
          //  this.userManager = userManager;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            try
            {
                var applicationUser = new User { UserName= "mail@test.com", Email = "mail@test.com", Password = "Holaaaa879" ,Dni="42464099", Surname = "dreher", Name = "franco" };
                var create = await this.AuthHelper.CreateUser(applicationUser, Configuration["jwt:key"]);
                
               // var result = await this.userManager.CreateAsync(applicationUser, applicationUser.Password);
                var user = this.AuthHelper.Get().ToList();
                return user;
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

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
