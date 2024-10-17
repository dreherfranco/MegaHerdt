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

        public bool Exist(string providerEmail)
        {
            var providerDb = this.helper.Get(x => x.Email.Equals(providerEmail)).FirstOrDefault();
            if (providerDb == null)
            {
                return false;
            }
            return true;
        }

        public bool Exist(string providerEmail, int id)
        {
            var providerDb = this.helper.Get(x => x.Email.Equals(providerEmail) && x.Id != id).FirstOrDefault();
            if(providerDb == null)
            {
                return false;
            }
            return true;
        }

        public IEnumerable<Provider> GetEnabledsProviders()
        {
            return this.helper.Get().Where(x=>x.Enabled);
        }

        public IEnumerable<Provider> GetDisabledsProviders()
        {
            return this.helper.Get().Where(x => !x.Enabled);
        }
    }
}
