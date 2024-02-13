using BeHealth.Business.Models.Location;
using BeHealth.Business.Resources.Location;
using BeHealth.Presentence.Entities.Locations;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface ILocationManager
    {
        Task<List<GovernorateResource>> GetGovernorates();
        Task<GovernorateResource> CreateGovernorate(GovernorateModel model);
        Task<GovernorateResource> UpdateGovernorate(long id, GovernorateModel model);
        Task<bool> DeleteGovernorates(long id);
    }
    public class LocationManager : ILocationManager
    {
        private readonly IRepository<GovernorateEntity> _repository;

        public LocationManager(IRepository<GovernorateEntity> repository)
        {
            _repository = repository;
        }

        public async Task<GovernorateResource> CreateGovernorate(GovernorateModel model)
        {
            var entity = new GovernorateEntity
            {
                GovernorateNameAR = model.GovernorateNameAR,
                GovernorateNameEN = model.GovernorateNameEN,
            };

            var createdEntity = _repository.Add(entity);
            await _repository.SaveChangesAsync();

            return new GovernorateResource
            {
                GovernorateNameAR = createdEntity.GovernorateNameAR,
                GovernorateNameEN = createdEntity.GovernorateNameEN,
                ID = createdEntity.ID
            };
        }

        public async Task<bool> DeleteGovernorates(long id)
        {
            var entity = await _repository.GetById(id);

            if (entity == null)
            {
                throw new Exception("Entity not found");
            }

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<List<GovernorateResource>> GetGovernorates()
        {
            var entities = await _repository.GetAllAsync();

            var result = new List<GovernorateResource>();

            foreach (var entity in entities)
            {
                var resource = new GovernorateResource
                {
                    GovernorateNameAR = entity.GovernorateNameAR,
                    GovernorateNameEN = entity.GovernorateNameEN,
                    ID = entity.ID,
                };

                result.Add(resource);
            }

            return result;
        }

        public async Task<GovernorateResource> UpdateGovernorate(long id, GovernorateModel model)
        {
            var entity = await _repository.GetById(id);

            if (entity == null)
            {
                throw new Exception("Entity not found");
            }

            entity.GovernorateNameAR = model.GovernorateNameAR;
            entity.GovernorateNameEN = model.GovernorateNameEN;

            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            return new GovernorateResource
            {
                GovernorateNameAR = entity.GovernorateNameAR,
                GovernorateNameEN = entity.GovernorateNameEN,
                ID = entity.ID
            };
        }
    }
}
