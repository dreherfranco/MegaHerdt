﻿using AutoMapper;
using MegaHerdt.API.DTOs.Purchase;
using MegaHerdt.API.DTOs.PurchasePayment;
using MegaHerdt.Models.Models.PaymentData;
using MegaHerdt.Services.Services;
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

        [HttpPost("purchase-reserved")]
        public async Task<IActionResult> PurchaseReserved([FromBody] PurchasePaymentMPDTO purchasePaymentDTO)
        {
            try
            {      
                var purchasePaymentData = this.mapper.Map<PurchasePaymentMP>(purchasePaymentDTO);

                var purchase = await this.purchasePaymentService.PurchaseReserved(purchasePaymentData);

                return Ok(mapper.Map<PurchaseDTO>(purchase));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, status = 400 });
            }
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
                return BadRequest(new { message = ex.Message, status = 400 });
            }
        }
    }
}
