using AutoMapper;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasePaymentsController : ControllerBase
    {
        private readonly PurchasePaymentService purchasePaymentService;
        private readonly IMapper mapper;
        public PurchasePaymentsController(PurchasePaymentService purchasePaymentService, IMapper mapper)
        {
            this.purchasePaymentService = purchasePaymentService;
            this.mapper = mapper;
        }

        [HttpPost("confirm-payment")]
        public async Task<IActionResult> ConfirmPayment([FromBody] PurchasePaymentConfirmDTO purchasePaymentDTO)
        {
            try
            {
                var purchasePaymentData = this.mapper.Map<PurchasePaymentData>(purchasePaymentDTO);
                var subscription = await this.purchasePaymentService.AddPayment(purchasePaymentData);
                return Ok(new { subscription = subscription });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
