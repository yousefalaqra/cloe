using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models;
using BeHealth.Business.Models.Settings;
using BeHealth.Business.Resources.Settings;
using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface ITypeManager
    {
        Task<List<TypeResource>> GetTypes(
            TypesFilterModel filter
            );

        Task<TypeResource> CreateType(TypeModel model);

        Task<bool> UpdateType(long id, TypeModel model);

        Task<bool> DeleteType(long id);
    }
    public class TypeManager : ITypeManager
    {
        private readonly IMapper _mapper;
        private readonly IRepository<TypesEntity> _repository;

        public TypeManager(
            IMapper mapper,
            IRepository<TypesEntity> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<List<TypeResource>> GetTypes(
            TypesFilterModel filter
            )
        {
            Expression<Func<TypesEntity, bool>> predicate = null;
            if (filter != null)
            {
                predicate = x => x.TypeCategory == filter.TypeCategory;
            }

            var entities = await _repository.GetAllAsync(predicate);

            var resources = _mapper.Map<List<TypeResource>>(entities);

            return resources;
        }

        public async Task<TypeResource> CreateType(TypeModel model)
        {
            var entity = _mapper.Map<TypesEntity>(model);

            var createdEntity = _repository.Add(entity);
            await _repository.SaveChangesAsync();

            var resource = _mapper.Map<TypeResource>(createdEntity);

            return resource;
        }

        public async Task<bool> UpdateType(long id, TypeModel model)
        {
            var entity = await _repository.GetById(id);

            if (entity.Equals(null))
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Type with ID {id} not found");
            }

            entity.Type = model.Type;

            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteType(long id)
        {
            var entity = await _repository.GetById(id);

            if (entity.Equals(null))
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Type with ID {id} not found");
            }

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}
