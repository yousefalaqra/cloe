
using BeHealth.Presentence;
using BeHealth.Presentence.Entities;
using BeHealth.Presentence.Respositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StockManagment.Presentence.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly BeHealthDBContext _context;
        public Repository(BeHealthDBContext context)
        {
            _context = context;
        }

        public IEnumerable<T> GetAll(
                Expression<Func<T, bool>> filter = null,
                Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                string includeProperties = ""
                )
        {
            IQueryable<T> result = _context.Set<T>();

            if (filter != null)
            {
                result = result.Where(filter);
            }

            if (orderBy != null)
            {
                result = orderBy(result);
            }

            foreach (string property in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                result = result.Include(property);
            }

            return result.ToList();
        }
        public Task<List<T>> GetAllAsync(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = ""
            )
        {
            IQueryable<T> result = _context.Set<T>();

            if (filter != null)
            {
                result = result.Where(filter);
            }

            if (orderBy != null)
            {
                result = orderBy(result);
            }

            foreach (string property in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                result = result.Include(property);
            }

            return result.ToListAsync();
        }
        public Task<List<T>> GetAllAsyncList(
            IList<Expression<Func<T, bool>>> filters = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = ""
            )
        {
            IQueryable<T> result = _context.Set<T>();

            if (filters.Count > 0)
            {
                foreach (var filter in filters)
                {

                    result = result.Where(filter);
                }
            }

            if (orderBy != null)
            {
                result = orderBy(result);
            }

            foreach (string property in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                result = result.Include(property);
            }

            return result.ToListAsync();
        }

        public ValueTask<T> GetById(long id)
        {
            return _context.Set<T>().FindAsync(id);
        }

        public Task<T> FirstOrDefault(
            Expression<Func<T, bool>> filter,
            string includeProperties = ""

            )
        {
            IQueryable<T> result = _context.Set<T>();

            foreach (string property in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                result = result.Include(property);
            }

            return result.FirstOrDefaultAsync(filter);
        }

        public Task<int> CountAll(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate == null)
                predicate = x => true;

            return _context.Set<T>().CountAsync(predicate);
        }

        public T Add(T entity)
        {
            return _context.Set<T>().Add(entity).Entity;
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
