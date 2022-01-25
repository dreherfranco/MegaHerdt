﻿using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class ArticleProviderService: BaseService<ArticleProvider>
    {
        public ArticleProviderService(ArticleProviderHelper helper) :
            base(helper)
        {

        }
    }
}
