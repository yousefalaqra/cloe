using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models.Settings;
using BeHealth.Business.Resources.Settings;
using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface IUnitManager
    {
        Task<List<UnitResource>> GetAllUnits();

        Task<UnitResource> CreateUnit(UnitModel model);

        Task<bool> UpdateUnit(long id, UnitModel model);

        Task<bool> DeleteUnit(long id);
    }

    public class UnitManager : IUnitManager
    {
        private readonly IMapper _mapper;
        private readonly IRepository<UnitEntity> _repository;

        public UnitManager(
            IMapper mapper,
            IRepository<UnitEntity> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<List<UnitResource>> GetAllUnits()
        {
            var entities = await _repository.GetAllAsync();

            var resources = _mapper.Map<List<UnitResource>>(entities);

            return resources;
        }

        public async Task<UnitResource> CreateUnit(UnitModel model)
        {
            var entity = _mapper.Map<UnitEntity>(model);

            var createdEntity = _repository.Add(entity);
            await _repository.SaveChangesAsync();

            var resource = _mapper.Map<UnitResource>(createdEntity);

            return resource;
        }

        public async Task<bool> UpdateUnit(long id, UnitModel model)
        {
            var entity = await _repository.GetById(id);

            if (entity.Equals(null))
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Unit with ID {id} not found");
            }

            entity.Code = model.Code;
            entity.GramsRatio = model.GramsRatio;
            entity.IsLiquid = model.IsLiquid;
            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteUnit(long id)
        {
            var entity = await _repository.GetById(id);

            if (entity.Equals(null))
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Unit with ID {id} not found");
            }

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}
