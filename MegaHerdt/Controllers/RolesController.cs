using MegaHerdt.API.DTOs.Role;
using MegaHerdt.API.Utils;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = Role.Admin)]
    public class RolesController : ControllerBase
    {
        private readonly RoleService RoleService;

        public RolesController(RoleService roleService)
        {
            this.RoleService = roleService;
        }

        [HttpGet("get-roles")]
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

        [HttpPost("create-role")]
        public async Task<ActionResult> CreateRole([FromBody] CreateRoleDTO roleDTO)
        {
            try
            {
                var createRole = await this.RoleService.CreateRole(roleDTO.RoleName.ToUpper());
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
        public async Task<ActionResult<bool>> AssignRole([FromBody] EditRoleDTO roleDTO)
        {
            try
            {
                var assignRole = await this.RoleService.AssignRole(roleDTO.RoleName.ToUpper(), roleDTO.UserEmail);
                if (assignRole)
                {
                    return true;
                }
                throw new Exception("Role didn't be assigned");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("remove-role-to-user")]
        public async Task<ActionResult<bool>> RemoveRoleToUser([FromBody] EditRoleDTO roleDTO)
        {
            try
            {

                var removeRole = await this.RoleService.RemoveRoleToUser(roleDTO.RoleName.ToUpper(), roleDTO.UserEmail);
                if (removeRole)
                {
                    return true;
                }
                throw new Exception("Role didn't be removed");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("delete-role")]
        public async Task<ActionResult> DeleteRole([FromBody] DeleteRoleDTO roleDTO)
        {
            try
            {
                await this.RoleService.DeleteRole(roleDTO.RoleName.ToUpper());
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("get-user-roles/{username}")]
        public async Task<ActionResult<List<string>>> GetUserRoles(string username)
        {
            try
            {
                return await this.RoleService.GetUserRoles(username);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
