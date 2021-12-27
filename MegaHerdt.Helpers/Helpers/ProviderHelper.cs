using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;

namespace MegaHerdt.Helpers.Helpers
{
    public class ProviderHelper: BaseHelper<Provider>
    {
        public ProviderHelper(Repository<Provider> repository):
            base(repository)
        {

        }
    }
}
