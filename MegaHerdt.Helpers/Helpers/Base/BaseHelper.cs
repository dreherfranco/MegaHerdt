using MegaHerdt.Repository.Base;
using System.Linq.Expressions;

namespace MegaHerdt.Helpers.Helpers.Base
{
    public class BaseHelper<T> where T : class
    {
        protected readonly Repository<T> repository;
        public BaseHelper(Repository<T> repository)
        {
            this.repository = repository;
        }

        public virtual async Task<T> Create(T entity)
        {
            return await this.repository.Add(entity);
        }

        public virtual async Task Update(T entity)
        {
            await this.repository.Update(entity);
        }

        public virtual async Task Delete(T entity)
        {
            await this.repository.Delete(entity);
        }

        public virtual IQueryable<T> Get(Expression<Func<T, bool>> filter = null)
        {
            return repository.Get(filter);
        }

    }
}
