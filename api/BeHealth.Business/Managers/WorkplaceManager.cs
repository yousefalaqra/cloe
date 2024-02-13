using BeHealth.Business.Resources.Organization;
using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface IWrokplaceManager
    {
        Task<IList<WorkplaceResource>> GetWorkplaces();
    }
    public class WorkplaceManager : IWrokplaceManager
    {
        private readonly IRepository<WorkPlaceEntity> _repository;

        public WorkplaceManager(IRepository<WorkPlaceEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IList<WorkplaceResource>> GetWorkplaces()
        {
            var entities = await _repository.GetAllAsync();

            var result = new List<WorkplaceResource>();

            foreach (var entity in entities)
            {
                result.Add(EntityToResource(entity));
            }

            return result;
        }

        private WorkplaceResource EntityToResource(WorkPlaceEntity entity)
        {
            var resource = new WorkplaceResource
            {
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                ID = entity.ID,
                Title = entity.Title,
                UpdatedBy = entity.UpdatedBy,
                UpdatedOn = entity.UpdatedOn
            };

            return resource;
        }
    }
}
