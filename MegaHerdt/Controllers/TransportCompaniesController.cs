using AutoMapper;
using MegaHerdt.API.DTOs.TransportCompany;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportCompaniesController : ControllerBase
    {
        private readonly TransportCompanyService transportCompanyService;
        private readonly IMapper Mapper;
        public TransportCompaniesController(TransportCompanyService transportCompanyService, IMapper mapper)
        {
            this.transportCompanyService = transportCompanyService;
            this.Mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<TransportCompanyDTO>> Get()
        {
            try
            {
                var transportCompanies = transportCompanyService.GetAll();
                return this.Mapper.Map<List<TransportCompanyDTO>>(transportCompanies);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<TransportCompanyDTO> Get(int id)
        {
            try
            {
                Expression<Func<TransportCompany, bool>> filter = x => x.Id == id;
                var transportCompany = transportCompanyService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<TransportCompanyDTO>(transportCompany);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult<TransportCompanyDTO>> Post([FromBody] TransportCompanyCreationDTO transportCompanyDTO)
        {
            try
            {
                var transportCompany = this.Mapper.Map<TransportCompany>(transportCompanyDTO);
                transportCompany = await transportCompanyService.Create(transportCompany);
                return this.Mapper.Map<TransportCompanyDTO>(transportCompany);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult<bool>> Put([FromBody] TransportCompanyDTO transportCompanyDTO)
        {
            try
            {
                Expression<Func<TransportCompany, bool>> filter = x => x.Id == transportCompanyDTO.Id;
                var transportCompanyDb = this.transportCompanyService.GetBy(filter).FirstOrDefault();
                transportCompanyDb = this.Mapper.Map(transportCompanyDTO, transportCompanyDb);
                await transportCompanyService.Update(transportCompanyDb);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                Expression<Func<TransportCompany, bool>> filter = x => x.Id == id;
                var transportCompany = this.transportCompanyService.GetBy(filter).FirstOrDefault();
                await transportCompanyService.Delete(transportCompany);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
