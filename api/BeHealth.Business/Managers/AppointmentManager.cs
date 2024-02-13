using BeHealth.Business.Error;
using BeHealth.Business.Models;
using BeHealth.Business.Resources.Appointment;
using BeHealth.Business.Resources.Clinets;
using BeHealth.Presentence.Entities.Appointments;
using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface IAppointmentManager
    {
        Task<AppointmentResource> AddAppointment(string clientId, AppointmentModel model);

        Task<List<AppointmentResource>> GetAll(int time = 0);

        Task<AppointmentResource> UpdateAppointment(long id, AppointmentModel model);

        Task<bool> DeleteAppointment(long id);
    }

    public class AppointmentManager : IAppointmentManager
    {
        private readonly IRepository<AppointmentEntity> _repository;
        private readonly IRepository<ClientEntity> _clientRepository;
        private readonly IClientManager _clientManager;

        public AppointmentManager(
            IRepository<AppointmentEntity> repository,
            IRepository<ClientEntity> clientRepository,
            IClientManager clientManager
            )
        {
            _repository = repository;
            _clientManager = clientManager;
            _clientRepository = clientRepository;
        }
        public async Task<AppointmentResource> AddAppointment(string clientId, AppointmentModel model)
        {
            var clientEntity = await _clientRepository.FirstOrDefault(x => x.clientId == clientId);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var appointmentEntity = new AppointmentEntity
            {
                ClientId = clientEntity.ID,
                EndTime = model.EndTime,
                StartTime = model.StartTime,
                Status = model.Status,
                ClientEntity  = clientEntity,
            };

            _repository.Add(appointmentEntity);
            await _repository.SaveChangesAsync();

            return await EntityToResource(appointmentEntity);
        }

        public async Task<List<AppointmentResource>> GetAll(int time = 0)
        {
            Expression<Func<AppointmentEntity, bool>> predicate = null;

            if(time > 0)
            {
                DateTimeOffset now = DateTimeOffset.Now.AddHours(time);

                predicate = x => x.StartTime <= now;

            }
            

            var entities = await _repository.GetAllAsync(predicate, null, "ClientEntity");

            var resources = new List<AppointmentResource>();

            foreach (var item in entities)
            {
                resources.Add(await EntityToResource(item));
            }

            return resources;
        }

        public async Task<bool> DeleteAppointment(long id)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"entity with ID {id} not found");

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<AppointmentResource> UpdateAppointment(long id, AppointmentModel model)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id, "ClientEntity");

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"entity with ID {id} not found");

            entity.EndTime = model.EndTime;
            entity.StartTime = model.StartTime;
            entity.Status = model.Status;

            _repository.Update(entity);
            await _repository.SaveChangesAsync();


            return await EntityToResource(entity);
        }


        private async Task<AppointmentResource> EntityToResource(AppointmentEntity entity)
        {
            var clientResource = await _clientManager.GetClientById(entity.ClientEntity.clientId);

            var resource = new AppointmentResource
            {
                ID = entity.ID,
                EndTime = entity.EndTime,
                StartTime = entity.StartTime,
                Status = entity.Status,
                Client = clientResource
            };

            return resource;
        }
    }
}
