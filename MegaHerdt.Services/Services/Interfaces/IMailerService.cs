using MegaHerdt.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services.Interfaces
{
    public interface IMailerService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
