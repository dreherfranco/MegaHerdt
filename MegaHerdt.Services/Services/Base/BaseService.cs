using MegaHerdt.Helpers.Helpers.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services.Base
{
    public class BaseService<T> where T : class
    {
        protected readonly BaseHelper<T> helper;
        public BaseService(BaseHelper<T> helper)
        {
            this.helper = helper;
        }
        public virtual async Task<T> Create(T entity)
        {
            return await this.helper.Create(entity);
        }

        public virtual async Task Update(T entity)
        {
            await this.helper.Update(entity);
        }

        public virtual async Task Delete(T entity)
        {
            await this.helper.Delete(entity);
        }

        public virtual IEnumerable<T> GetAll()
        {
            return this.helper.Get();
        }

        public virtual IEnumerable<T> GetBy(Expression<Func<T, bool>> filter = null)
        {
            return this.helper.Get(filter);
        }

    }
}
