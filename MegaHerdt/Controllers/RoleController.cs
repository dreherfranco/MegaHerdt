﻿using MegaHerdt.API.DTOs.Role;
using MegaHerdt.API.Utils;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService RoleService;
        public RoleController(RoleService roleService)
        {
            this.RoleService = roleService;
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
    }
}
