using MegaHerdt.Helpers.Helpers.Base;
using MegaHerdt.Models.Models;
using MegaHerdt.Repository.Base;


namespace MegaHerdt.Helpers.Helpers
{
    public class ReparationStateHelper: BaseHelper<ReparationState>
    {

        public ReparationStateHelper(Repository<ReparationState> repository)
            :base(repository)
        {
        }

    }
}
