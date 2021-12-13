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

        public T Agregar(T entity)
        {
            Context.Set<T>().Add(entity);
            Context.SaveChangesAsync();
            return entity;
        }

        public IEnumerable<T> Obtener(Expression<Func<T, bool>> filter = null)
        {
            if (filter == null)
            {
                return this.Context.Set<T>().AsEnumerable();
            }
            else
            {
                return this.Context.Set<T>().Where(filter);

            }

        }

        public void Eliminar(T entity)
        {
            this.Context.Set<T>().Remove(entity);
            Context.SaveChanges();

        }

        public void Actualizar(T entidad)
        {
            this.Context.Entry(entidad).State = EntityState.Modified;
            this.Context.SaveChanges();
        }

    }
}
