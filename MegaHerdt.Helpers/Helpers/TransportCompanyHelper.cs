using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;

namespace MegaHerdt.Helpers.Helpers
{
    public class TransportCompanyHelper : BaseHelper<TransportCompany>
    {
        public TransportCompanyHelper(Repository<TransportCompany> repository)
            : base(repository)
        {

        }
    }
}
