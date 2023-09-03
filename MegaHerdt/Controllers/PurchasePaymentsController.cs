using AutoMapper;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Services.Services;
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

        [HttpPost("confirm-payment-mp")]
        public async Task<IActionResult> ConfirmPaymentMP([FromBody] PurchasePaymentMPDTO purchasePaymentDTO)
        {
            try
            {
                var request = new PreferenceRequest
                {
                    Items = new List<PreferenceItemRequest>
                    {
                        new PreferenceItemRequest
                        {
                            Title = "Mi producto",
                            Quantity = 1,
                            CurrencyId = "ARS",
                            UnitPrice = 75.56m,
                        },
                    },
                };

                // Crea la preferencia usando el client
                var client = new PreferenceClient();
                Preference preference = await client.CreateAsync(request);


                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
