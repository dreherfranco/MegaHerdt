using MegaHerdt.DbConfiguration.DbConfiguration;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace MegaHerdt.Repository.Base
{
    public class Repository<T> where T : class
    {
        private ApplicationDbContext Context { get; set; }
        public Repository(ApplicationDbContext context)
        {
            Context = context;
        }

        public T Add(T entity)
        {
            Context.Set<T>().Add(entity);
            Context.SaveChangesAsync();
            return entity;
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> filter = null)
        {
            if (filter == null)
            {
                return this.Context.Set<T>().AsQueryable();
            }
            else
            {
                return this.Context.Set<T>().Where(filter);

            }

        }

        public void Delete(T entity)
        {
            this.Context.Set<T>().Remove(entity);
            Context.SaveChangesAsync();
        }

        public void Update(T entidad)
        {
            this.Context.Entry(entidad).State = EntityState.Modified;
            this.Context.SaveChangesAsync();
        }

    }
}
