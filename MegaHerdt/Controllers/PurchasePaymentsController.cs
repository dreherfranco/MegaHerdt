using AutoMapper;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Services.Services;
using MercadoPago.Client.Common;
using MercadoPago.Client.Customer;
using MercadoPago.Client.Payment;
using MercadoPago.Client.Preference;
using MercadoPago.Resource;
using MercadoPago.Resource.Customer;
using MercadoPago.Resource.Payment;
using MercadoPago.Resource.Preference;
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

        [HttpPost("confirm-payment-mp")]
        public async Task<IActionResult> ConfirmPaymentMP([FromBody] PurchasePaymentMPDTO purchasePaymentDTO)
        {
            try
            {
                
                var purchasePaymentData = this.mapper.Map<PurchasePaymentMP>(purchasePaymentDTO);

                var paymentResponse = await this.purchasePaymentService.AddPaymentMP(purchasePaymentData);

                return Ok(paymentResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
