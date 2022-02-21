using AutoMapper;
using MegaHerdt.API.DTOs.ReparationPayment;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReparationPaymentsController : ControllerBase
    {
        private readonly ReparationPaymentService reparationPaymentService;
        private readonly IMapper mapper;
        public ReparationPaymentsController(ReparationPaymentService reparationPaymentService, IMapper mapper)
        {
            this.reparationPaymentService = reparationPaymentService;
            this.mapper = mapper;
        }

        [HttpPost("confirm-payment")]
        public async Task<IActionResult> ConfirmPayment([FromBody] ReparationPaymentConfirmDTO reparationPaymentDTO)
        {
            try
            {
                var reparationPaymentData = this.mapper.Map<ReparationPaymentData>(reparationPaymentDTO);
                var subscription =  await this.reparationPaymentService.AddPayment(reparationPaymentData);
                return Ok(new { subscription = subscription });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
