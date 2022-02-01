﻿using AutoMapper;
using MegaHerdt.API.DTOs.Article;
using MegaHerdt.API.DTOs.ArticleProvider;
using MegaHerdt.API.FileManager.Interface;
using MegaHerdt.API.Filters;
using MegaHerdt.API.Utils;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace MegaHerdt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  //  [AuthorizeRoles(Role.Admin, Role.Empleado)]
    public class ArticlesProvidersController : ControllerBase
    {
        private readonly ArticleProviderService articleProviderService;
        private readonly IMapper Mapper;
        private readonly IFileManager fileManager;
        private readonly string container = "articles-providers";
        public ArticlesProvidersController(ArticleProviderService articleProviderService, IMapper Mapper
            ,IFileManager fileManager)
        {
            this.articleProviderService = articleProviderService;
            this.Mapper = Mapper;
            this.fileManager = fileManager;
        }

        

        [HttpGet]
        public ActionResult<List<ArticleProviderDTO>> GetArticlesProviders()
        {
            try
            {
                var articlesProviders = articleProviderService.GetAll();
                return this.Mapper.Map<List<ArticleProviderDTO>>(articlesProviders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ArticleProviderDTO> GetArticleProvider(int id)
        {
            try
            {
                Expression<Func<ArticleProvider, bool>> filter = x => x.Id == id;
                var articleProviderDb = this.articleProviderService.GetBy(filter).FirstOrDefault();
                return this.Mapper.Map<ArticleProviderDTO>(articleProviderDb);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("create")]     
        public async Task<ActionResult<bool>> Post([FromForm] ArticleProviderCreationDTO articleProviderDTO)
        {
            try
            {
                var articleProvider = Mapper.Map<ArticleProvider>(articleProviderDTO);

                if (articleProviderDTO.Voucher != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await articleProviderDTO.Voucher.CopyToAsync(memoryStream);
                        var content = memoryStream.ToArray();
                        var extension = Path.GetExtension(articleProviderDTO.Voucher.FileName);
                        articleProvider.Voucher = await fileManager.SaveFile(content, extension, container,
                        articleProviderDTO.Voucher.ContentType);
                    }
                }
                await articleProviderService.Create(articleProvider);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult<bool>> Put([FromBody] ArticleProviderUpdateDTO articleProviderDTO)
        {
            try
            {
                Expression<Func<ArticleProvider, bool>> filter = x => x.Id == articleProviderDTO.Id;
                var articleProviderDb = this.articleProviderService.GetBy(filter).FirstOrDefault();

                articleProviderDb = this.Mapper.Map(articleProviderDTO, articleProviderDb);
                await articleProviderService.Update(articleProviderDb);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("update-voucher")]
        public async Task<ActionResult<bool>> UpdateVoucher([FromForm] ArticleProviderVoucherUpdateDTO articleProviderDTO)
        {
            try
            {
                Expression<Func<ArticleProvider, bool>> filter = x => x.Id == articleProviderDTO.Id;
                var articleProvider = this.articleProviderService.GetBy(filter).FirstOrDefault();
                if (articleProviderDTO.Voucher != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await articleProviderDTO.Voucher.CopyToAsync(memoryStream);
                        var content = memoryStream.ToArray();
                        var extension = Path.GetExtension(articleProviderDTO.Voucher.FileName);
                        articleProvider.Voucher = await fileManager.SaveFile(content, extension, container,
                        articleProviderDTO.Voucher.ContentType);
                    }
                }

                await articleProviderService.Update(articleProvider);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AuthorizeRoles(Role.Admin, Role.Empleado)]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                Expression<Func<ArticleProvider, bool>> filter = x => x.Id == id;
                var articleProvider = this.articleProviderService.GetBy(filter).FirstOrDefault();
                await articleProviderService.Delete(articleProvider);
                return true;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}