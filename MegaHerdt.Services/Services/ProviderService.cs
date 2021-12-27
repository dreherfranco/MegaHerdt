using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services.Base;

namespace MegaHerdt.Services.Services
{
    public class ProviderService: BaseService<Provider>
    {
        public ProviderService(ProviderHelper helper):
            base(helper)
        {

        }
    }
}
