using BeHealth.Presentence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Presentence.Respositories
{
    public interface IRepository<T> where T : class, IEntity
    {
        //? what the repositroy gonna do? firstOrDefault(), GetByID, getAll, SAVE, Update, Delete, Count.

        /// <summary>
        ///     Get the first elemnt that match the filter
        /// </summary>
        /// <param name="filter">
        ///     An Expression tree the will represent the filter we will match against.
        /// </param>
        /// <returns>
        ///     return enitty of type T
        /// </returns>
        Task<T> FirstOrDefault(
            Expression<Func<T, bool>> filter,
            string includeProperties = ""
            );


        /// <summary>
        ///     Get entity by id
        /// </summary>
        /// <param name="id">
        ///     int id, the value that will be used to get the enetiy 
        /// </param>
        /// <returns>
        ///     return enitty of type T
        /// </returns>
        ValueTask<T> GetById(long id);


        /// <summary>
        ///     Return the list of T from the database.
        /// </summary>
        /// <param name="predicate">
        ///     An optional filter that will be matched against the set to filter it.
        /// </param>
        /// <param name="orderBy">
        ///     Order by function to return the ordered result.
        /// </param>
        /// <param name="includeProperties">
        ///     String that will hold the properties to include, split each property with ','.
        /// </param>
        /// <returns>
        ///     An IEnumerable of TEntity that will be filter and/or ordered by with includes if needed.
        /// </returns>
        IEnumerable<T> GetAll(
            Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = ""
            );

        Task<List<T>> GetAllAsync(
           Expression<Func<T, bool>> predicate = null,
           Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
           string includeProperties = ""
           );

        Task<List<T>> GetAllAsyncList(
           IList<Expression<Func<T, bool>>> predicates = null,
           Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
           string includeProperties = ""
           );


        /// <summary>
        ///     Return the count of T in the set.
        /// </summary>
        /// <param name="predicate">
        ///     an optional filtering predicate to return the count of fitlered set.
        /// </param>
        /// <returns>
        ///     the Count of the set that matches the predicate or all of the set.
        /// </returns>
        Task<int> CountAll(Expression<Func<T, bool>> predicate = null);


        /// <summary>
        ///     Submits the changes to the database.
        /// </summary>
        /// <returns>
        ///      The number of state entries written to the database.
        /// </returns>
        int SaveChanges();


        /// <summary>
        ///     Submits the changes to the database.
        /// </summary>
        /// <returns>
        ///      The number of state entries written to the database.
        /// </returns>
        Task<int> SaveChangesAsync();



        /// <summary>
        ///     Attach the T to the set so it can be submitted to the database.
        /// </summary>
        /// <param name="entity">
        ///     The T that will be attached
        /// </param>
        T Add(T entity);


        /// <summary>
        ///     Set the State of the T to modified so it submits the changes to the database.
        /// </summary>
        /// <param name="entity">
        ///     The T that will be update
        /// </param>
        void Update(T entity);


        /// <summary>
        ///     Set the State of the T to deketed so it removes T from the database.
        /// </summary>
        /// <param name="entity">
        ///     The T that will be deleted
        /// </param>
        void Remove(T entity);
    }
}
