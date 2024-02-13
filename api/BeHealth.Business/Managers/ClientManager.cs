using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models.Clients;
using BeHealth.Business.Resources.Clinets;
using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Respositories;
using System.Net;
using System.Threading.Tasks;
using BeHealth.Presentence.Enums;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using ExcelDataReader;
using System.Data;
using System.Linq;
using System;
using BeHealth.Business.Resources.FoodManamgnet.FoodItems;
using BeHealth.Presentence.Entities.Organization;
using System.Linq.Expressions;
using BeHealth.Presentence.Entities.Subscription;
using BeHealth.Business.Resources.Appointment;

namespace BeHealth.Business.Managers
{
    public interface IClientManager
    {

        Task<ClientResource> AddClient(ClientModel model);
        Task<IList<ClientResource>> GetAll(long workplaceId = 0, string searchKey = "");
        Task<ClientResource> GetClientById(string id);
        Task<ClientResource> UpdateClient(string id, ClientModel model);
        Task<bool> ValidatePhoneNumber(string number);
        Task<bool> DeleteClient(string id);


        Task<ClientResource> AddClientTag(string clientId, string tag);
        Task<ClientResource> DeleteClientTag(string clientId, long tagId);


        Task<ClientResource> AddClientDisease(string clientId, string disease);
        Task<ClientResource> DeleteClientDisease(string clientId, long diseaseId);


        Task<ClientResource> AddClientMedication(string clientId, string medication);
        Task<ClientResource> DeleteClientMedication(string clientId, long medicationId);

        Task<ClientResource> AddClientObservation(string clientId, ClientObservationModel model);
        Task<ClientResource> UpdateClientObservation(string clientId, long observationId, ClientObservationModel model);
        Task<ClientResource> DeleteClientObservation(string clientId, long observationId);


        Task<ClientResource> AddClientMeasurements(string clientId, ClientMeasurementModel model);
        Task<ClientResource> UpdateClientMeasurements(string clientId, long measurementId, ClientMeasurementModel model);
        Task<ClientResource> DeleteClientMeasurements(string clientId, long measurementId);

        Task<ClientResource> AddClientSubscription(string clientId, long subscriptionsId);
        Task<ClientResource> PuauseClientSubscription(string clientId, long subscriptionsId, long id);
        Task<ClientResource> DeleteClientSubscriptions(string clientId, long id);

        Task<ClientResource> AddClientPayment(string clientId, PaymentModel model);
        Task<ClientResource> UpdateClientPayment(string clientId, long paymentId, PaymentModel model);
        Task<ClientResource> deleteClientPayment(string clientId, long paymentId);
    }
    public class ClientManager : IClientManager
    {
        private readonly IRepository<ClientEntity> _repository;
        private readonly IRepository<ClientTagsEntity> _tagsRepository;
        private readonly IRepository<ClientsDiseasesEntity> _diseasesRepository;
        private readonly IRepository<ClinetsMedicationsEntity> _medicationRespository;
        private readonly IRepository<ClientObservationsEntity> _observationRespository;
        private readonly IRepository<ClientMeasurementEntity> _clientMeasurementEntityRepository;
        private readonly IRepository<ClientsSubscriptionsEntity> _clientSubscriptionRepository;
        private readonly IRepository<SubscriptionEntity> _subscriptionRepository;
        private readonly IRepository<ClientDueEntity> _dueRepository;
        private readonly IRepository<ClientPaymentEntity> _paymentRepository;
        private readonly ITemplateManager _templateManager;
        private readonly IMapper _mapper;

        private readonly string clientsIncldues =
            "ClientWorkplaceEntities,ClientTags,ClientsDiseases,ClinetsMedications,ClientObservations,ClientTmplate,ClientMeasurements,ClientsSubscriptions,Dues,ClientPayments,Appointments";

        public ClientManager(
            IRepository<ClientEntity> repository,
            IRepository<ClientTagsEntity> tagsRepository,
            IRepository<ClientsDiseasesEntity> diseasesRepository,
            IRepository<ClinetsMedicationsEntity> medicationRespository,
            IRepository<ClientObservationsEntity> observationRespository,
            IRepository<ClientMeasurementEntity> clientMeasurementEntityRepository,
            IRepository<ClientsSubscriptionsEntity> clientSubscriptionRepository,
            IRepository<SubscriptionEntity> subscriptionRepository,
            IRepository<ClientDueEntity> dueRepository,
            IRepository<ClientPaymentEntity> paymentRepository,
            ITemplateManager templateManager,
            IMapper mapper)
        {
            _repository = repository;
            _tagsRepository = tagsRepository;
            _diseasesRepository = diseasesRepository;
            _medicationRespository = medicationRespository;
            _observationRespository = observationRespository;
            _clientMeasurementEntityRepository = clientMeasurementEntityRepository;
            _clientSubscriptionRepository = clientSubscriptionRepository;
            _subscriptionRepository = subscriptionRepository;
            _dueRepository = dueRepository;
            _paymentRepository = paymentRepository;
            _templateManager = templateManager;
            _mapper = mapper;
        }


        public async Task<ClientResource> GetClientById(string id)
        {
            var entity = await _repository.FirstOrDefault(x => x.clientId == id, clientsIncldues);

            var resource = entityToResource(entity);

            return resource;
        }


        public async Task<ClientResource> UpdateClient(string id, ClientModel model)
        {
            var entity = await _repository.FirstOrDefault(x => x.clientId == id, clientsIncldues);

            if (entity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"User with ID {id} not found");
            }

            if (model.BirthDate != null)
                entity.BirthDate = model.BirthDate;

            if (!string.IsNullOrEmpty(model.FullName))
                entity.FullName = model.FullName;

            if (Enum.IsDefined(typeof(GenderEnum), model.Gender))
                entity.Gender = model.Gender;

            if (!string.IsNullOrEmpty(model.PhoneNumber))
                entity.PhoneNumber = model.PhoneNumber;

            entity.UpdatedBy = "Developer";
            entity.UpdatedOn = DateTime.Now;

            if (model.workPlacesIds?.Count > 0)
            {
                var newWrokplaces = new List<ClientWorkplaceEntity>();
                foreach (var wkid in model.workPlacesIds)
                {
                    var workPlEntity = new ClientWorkplaceEntity
                    {
                        ClientId = entity.ID,
                        WorkplaceId = wkid
                    };

                    newWrokplaces.Add(workPlEntity);

                    entity.ClientWorkplaceEntities = newWrokplaces;
                }

            }

            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            var resource = entityToResource(entity);

            return resource;
        }

        public async Task<bool> DeleteClient(string id)
        {
            var entity = await _repository.FirstOrDefault(x => x.clientId == id);

            if (entity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"User with ID {id} not found");
            }

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<ClientResource> AddClient(ClientModel model)
        {
            var clientEntity = modelToEntity(model);

            clientEntity.CreatedAt = DateTime.Now;
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Add(clientEntity);
            await _repository.SaveChangesAsync();

            model.Template.ClientId = clientEntity.ID;
            await _templateManager.CreateNewTemplate(model.Template);

            var result = entityToResource(clientEntity);

            return result;
        }

        public async Task<IList<ClientResource>> GetAll(long workplaceId = 0, string searchKey = "")
        {
            List<Expression<Func<ClientEntity, bool>>> predicates = new List<Expression<Func<ClientEntity, bool>>>();
            if (workplaceId != 0)
            {
                predicates.Add((X) => X.ClientWorkplaceEntities.Any(z => z.WorkplaceId == workplaceId));
            }

            if (!string.IsNullOrEmpty(searchKey))
            {
                predicates.Add((X) => X.FullName.Contains(searchKey) || X.PhoneNumber.Contains(searchKey));
            }

            var entities = await _repository.GetAllAsyncList(
                predicates,
                null,
                clientsIncldues
                );

            var result = new List<ClientResource>();

            foreach (var entity in entities)
            {
                result.Add(entityToResource(entity));
            }

            return result;
        }

        private ClientResource entityToResource(ClientEntity clientEntity)
        {
            var workPlaces = new List<long>();

            var tags = new List<TagResource>();
            var diseases = new List<ClientDiseaseResource>();
            var medications = new List<ClientMedicationResource>();
            var observations = new List<ClientObservationResource>();
            var mesaurements = new List<clientMeasurementResource>();
            var clientSubscriptions = new List<ClientSubscriptionsResource>();
            var dues = new List<ClientDueResource>();
            var payments = new List<ClientPaymentResource>();
            var appointment = new List<AppointmentResource>();

            foreach (var item in clientEntity.ClientWorkplaceEntities)
            {
                workPlaces.Add(item.WorkplaceId);
            }

            if (clientEntity.ClientTags != null)
                foreach (var tagEntity in clientEntity.ClientTags)
                {
                    var tagResource = new TagResource
                    {
                        Tag = tagEntity.Tag,
                        TagId = tagEntity.ID
                    };

                    tags.Add(tagResource);
                }

            if (clientEntity.ClientsDiseases != null)
                foreach (var diseaseEntity in clientEntity.ClientsDiseases)
                {
                    var diseaseResource = new ClientDiseaseResource
                    {
                        DiseaseName = diseaseEntity.DiseaseName,
                        ID = diseaseEntity.ID
                    };

                    diseases.Add(diseaseResource);
                }

            if (clientEntity.ClinetsMedications != null)
                foreach (var medcationEntity in clientEntity.ClinetsMedications)
                {
                    var medicationResource = new ClientMedicationResource
                    {
                        MedicationName = medcationEntity.MedicationName,
                        ID = medcationEntity.ID
                    };

                    medications.Add(medicationResource);
                }

            if (clientEntity.ClientObservations != null)
                foreach (var observationEntity in clientEntity.ClientObservations)
                {
                    var observationResource = new ClientObservationResource
                    {
                        Observation = observationEntity.Observation,
                        ObservationDate = observationEntity.ObservationDate,
                        ID = observationEntity.ID
                    };

                    observations.Add(observationResource);
                }

            long? templateId = null;
            if (clientEntity.ClientTmplate != null)
            {
                templateId = clientEntity.ClientTmplate.ID;
            }

            if (clientEntity.ClientMeasurements != null)
            {
                foreach (var mesuarementEntity in clientEntity.ClientMeasurements)
                {
                    var measurementResource = new clientMeasurementResource
                    {
                        BodyFatMass = mesuarementEntity.BodyFatMass,
                        BodyMassIndex = mesuarementEntity.BodyMassIndex,
                        CaloriesIntake = mesuarementEntity.CaloriesIntake,
                        Date = mesuarementEntity.Date,
                        FatOfLeftArm = mesuarementEntity.FatOfLeftArm,
                        FatOfLeftLeg = mesuarementEntity.FatOfLeftLeg,
                        FatOfRightArm = mesuarementEntity.FatOfRightArm,
                        FatOfRightLeg = mesuarementEntity.FatOfRightLeg,
                        FatOfTruck = mesuarementEntity.FatOfTruck,
                        Height = mesuarementEntity.Height,
                        ID = mesuarementEntity.ID,
                        Minerals = mesuarementEntity.Minerals,
                        Protien = mesuarementEntity.Protien,
                        skeletalMuscleMass = mesuarementEntity.skeletalMuscleMass,
                        TotalBodyWater = mesuarementEntity.TotalBodyWater,
                        Wight = mesuarementEntity.Wight,
                        WaistHipRatio = mesuarementEntity.WaistHipRatio
                    };
                    mesaurements.Add(measurementResource);
                }
            }

            if (clientEntity.ClientsSubscriptions != null)
            {
                foreach (var subscriptionEntity in clientEntity.ClientsSubscriptions)
                {
                    var subscriptionResource = new ClientSubscriptionsResource
                    {
                        EndTime = subscriptionEntity.EndDate,
                        ID = subscriptionEntity.ID,
                        IsCurrent = subscriptionEntity.IsCurrent,
                        StartTime = subscriptionEntity.StartDate,
                        IsPause = subscriptionEntity.IsPause,
                        PauseTime = subscriptionEntity.PuaseTime,
                        OriginalPeriod = subscriptionEntity.OrgignalPeriod
                    };

                    clientSubscriptions.Add(subscriptionResource);
                }
            }

            if (clientEntity.ClientPayments != null)
            {
                foreach (var paymentEntity in clientEntity.ClientPayments)
                {
                    var oaymentReource = new ClientPaymentResource
                    {
                        ID = paymentEntity.ID,
                        Amount = paymentEntity.Amount,
                        PaymentDate = paymentEntity.PyamentDate
                    };

                    payments.Add(oaymentReource);
                }
            }

            if (clientEntity.Dues != null)
            {
                foreach (var DuesEntity in clientEntity.Dues)
                {
                    var dueResource = new ClientDueResource
                    {
                        Amount = DuesEntity.Amount,
                        ID = DuesEntity.ID,
                        DueDate = DuesEntity.DueDate,
                        Reason = DuesEntity.Reason
                    };

                    dues.Add(dueResource);
                }
            }

            var inDept = false;

            if (dues.Count > 0)
            {
                if (payments.Count == 0)
                {

                    inDept = true;
                }
                else
                {
                    var totalDues = 0.0;
                    var totalPayments = 0.0;
                    foreach (var item in dues)
                    {
                        totalDues += item.Amount;
                    }
                    foreach (var item in payments)
                    {
                        totalPayments += item.Amount;
                    }

                    if (totalPayments < totalDues)
                    {
                        inDept = true;
                    }
                    else
                    {
                        inDept = false;
                    }

                }
            }


            if (clientEntity.Appointments != null)
            {
                var sorted = clientEntity.Appointments.OrderBy(x => x.StartTime);
                foreach (var item in sorted)
                {
                    var appointmentResocue = new AppointmentResource
                    {
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        ID = item.ID,
                        Status = item.Status
                    };

                    appointment.Add(appointmentResocue);
                }
            }

            var result = new ClientResource
            {
                BirthDate = clientEntity.BirthDate,
                ClientId = clientEntity.clientId,
                CreatedAt = clientEntity.CreatedAt,
                CreatedBy = clientEntity.CreatedBy,
                FullName = clientEntity.FullName,
                PhoneNumber = clientEntity.PhoneNumber,
                UpdatedBy = clientEntity.UpdatedBy,
                UpdatedOn = clientEntity.UpdatedOn,
                Gender = clientEntity.Gender,
                IsActive = clientEntity.isActive,
                WorkPLacesIds = workPlaces,
                ClientTags = tags,
                ClientDiseases = diseases,
                ClientMedications = medications,
                ClientObservations = observations,
                TemplateId = templateId,
                clientMeasurements = mesaurements,
                ClientSubscriptions = clientSubscriptions,
                Dues = dues,
                Payments = payments,
                InDebt = inDept,
                Appointments = appointment,
            };

            return result;
        }

        private ClientEntity modelToEntity(ClientModel model)
        {
            var result = new ClientEntity
            {
                BirthDate = model.BirthDate,
                PhoneNumber = model.PhoneNumber,
                CreatedBy = model.CreatedBy,
                clientId = model.PhoneNumber,
                FullName = model.FullName,
                UpdatedBy = model.UpdatedBy,
                UpdatedOn = model.UpdatedOn,
                Gender = model.Gender,
                Username = model.PhoneNumber,
                Password = model.PhoneNumber

            };

            var clientWorkPlaces = new List<ClientWorkplaceEntity>();

            foreach (var id in model.workPlacesIds)
            {
                var cwEntity = new ClientWorkplaceEntity
                {
                    WorkplaceId = id
                };


                clientWorkPlaces.Add(cwEntity);
            }

            result.ClientWorkplaceEntities = clientWorkPlaces;

            return result;
        }

        public async Task<bool> ValidatePhoneNumber(string number)
        {
            var count = await _repository.CountAll(x => x.PhoneNumber.Contains(number));

            var result = count <= 0;


            return result;
        }

        public async Task<ClientResource> AddClientTag(string clientId, string tag)
        {
            var clientEntity = await _repository.FirstOrDefault(
                x => x.clientId == clientId,
                clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = new ClientTagsEntity { ClientId = clientEntity.ID, Tag = tag };

            _tagsRepository.Add(entity);
            await _tagsRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> DeleteClientTag(string clientId, long tagId)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var tagEntity = await _tagsRepository.GetById(tagId);


            if (tagEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Tag with ID {tagId} not found");

            _tagsRepository.Remove(tagEntity);
            await _tagsRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> AddClientDisease(string clientId, string diseaseName)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = new ClientsDiseasesEntity
            {
                ClientID = clientEntity.ID,
                DiseaseName = diseaseName,
            };

            _diseasesRepository.Add(entity);
            await _diseasesRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }
        public async Task<ClientResource> DeleteClientDisease(string clientId, long diseaseId)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = await _diseasesRepository.GetById(diseaseId);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Diseases with ID {diseaseId} not found");


            _diseasesRepository.Remove(entity);
            await _diseasesRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> AddClientMedication(string clientId, string medication)
        {
            var clientEntity = await _repository.FirstOrDefault(
              x => x.clientId == clientId,
              clientsIncldues);


            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = new ClinetsMedicationsEntity
            {
                ClientID = clientEntity.ID,
                MedicationName = medication,
            };

            _medicationRespository.Add(entity);
            await _medicationRespository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> DeleteClientMedication(string clientId, long medicationId)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = await _medicationRespository.GetById(medicationId);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Medication with ID {medicationId} not found");


            _medicationRespository.Remove(entity);
            await _medicationRespository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> AddClientObservation(string clientId, ClientObservationModel model)
        {
            var clientEntity = await _repository.FirstOrDefault(
              x => x.clientId == clientId,
              clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = new ClientObservationsEntity
            {
                Observation = model.Observation,
                ObservationDate = model.ObservationDate,
                ClientID = clientEntity.ID
            };

            _observationRespository.Add(entity);
            await _observationRespository.SaveChangesAsync();


            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();


            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> UpdateClientObservation(string clientId, long observationId, ClientObservationModel model)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = await _observationRespository.GetById(observationId);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Obsercation with ID {observationId} not found");

            entity.Observation = model.Observation;
            entity.ObservationDate = model.ObservationDate;

            _observationRespository.Update(entity);
            await _observationRespository.SaveChangesAsync();


            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);

        }

        public async Task<ClientResource> DeleteClientObservation(string clientId, long observationId)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");


            var entity = await _observationRespository.GetById(observationId);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Obsercation with ID {observationId} not found");


            _observationRespository.Remove(entity);
            await _observationRespository.SaveChangesAsync();


            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);

        }

        public async Task<ClientResource> AddClientMeasurements(string clientId, ClientMeasurementModel model)
        {
            var clientEntity = await _repository.FirstOrDefault(
               x => x.clientId == clientId,
               clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var mesaurementEntity = new ClientMeasurementEntity
            {
                BodyFatMass = model.BodyFatMass,
                BodyMassIndex = model.BodyMassIndex,
                CaloriesIntake = model.CaloriesIntake,
                ClientId = clientEntity.ID,
                Minerals = model.Minerals,
                Protien = model.Protien,
                skeletalMuscleMass = model.skeletalMuscleMass,
                TotalBodyWater = model.TotalBodyWater,
                Wight = model.Wight,
                Date = model.Date,
                Height = model.Height,
                FatOfTruck = model.FatOfTruck,
                FatOfLeftArm = model.FatOfLeftArm,
                FatOfLeftLeg = model.FatOfLeftLeg,
                FatOfRightArm = model.FatOfRightArm,
                FatOfRightLeg = model.FatOfRightLeg
            };

            _clientMeasurementEntityRepository.Add(mesaurementEntity);
            await _clientMeasurementEntityRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> UpdateClientMeasurements(string clientId, long measurementId, ClientMeasurementModel model)
        {
            var clientEntity = await _repository.FirstOrDefault(
              x => x.clientId == clientId,
              clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var mesaurementEntity = await _clientMeasurementEntityRepository.FirstOrDefault(x => x.ID == measurementId);

            if (mesaurementEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"mesaurementEntity with ID {measurementId} not found");

            mesaurementEntity.Minerals = model.Minerals;
            mesaurementEntity.Protien = model.Protien;
            mesaurementEntity.skeletalMuscleMass = model.skeletalMuscleMass;
            mesaurementEntity.TotalBodyWater = model.TotalBodyWater;
            mesaurementEntity.Wight = model.Wight;
            mesaurementEntity.BodyFatMass = model.BodyFatMass;
            mesaurementEntity.BodyMassIndex = model.BodyMassIndex;
            mesaurementEntity.CaloriesIntake = model.CaloriesIntake;
            mesaurementEntity.Date = model.Date;
            mesaurementEntity.FatOfLeftArm = model.FatOfLeftArm;
            mesaurementEntity.FatOfLeftLeg = model.FatOfLeftLeg;
            mesaurementEntity.FatOfRightArm = model.FatOfRightArm;
            mesaurementEntity.FatOfRightLeg = model.FatOfRightLeg;
            mesaurementEntity.FatOfTruck = model.FatOfTruck;
            mesaurementEntity.Height = model.Height;
            mesaurementEntity.WaistHipRatio = model.WaistHipRatio;

            _clientMeasurementEntityRepository.Update(mesaurementEntity);
            await _clientMeasurementEntityRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);

        }

        public async Task<ClientResource> DeleteClientMeasurements(string clientId, long measurementId)
        {
            var clientEntity = await _repository.FirstOrDefault(
             x => x.clientId == clientId,
             clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var mesaurementEntity = await _clientMeasurementEntityRepository.FirstOrDefault(x => x.ID == measurementId);

            if (mesaurementEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"mesaurementEntity with ID {measurementId} not found");

            _clientMeasurementEntityRepository.Remove(mesaurementEntity);
            await _clientMeasurementEntityRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Develop";
            clientEntity.UpdatedOn = DateTime.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> AddClientSubscription(string clientId, long subscriptionsId)
        {
            var clientEntity = await _repository.FirstOrDefault(
            x => x.clientId == clientId,
            clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var subscriptionEntity = await _subscriptionRepository.FirstOrDefault(x => x.ID == subscriptionsId);

            if (subscriptionEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"subscriptionEntity with ID {subscriptionsId} not found");

            var check = await _clientSubscriptionRepository.GetAllAsync(x => x.ClientId == clientEntity.ID && x.IsCurrent == true);

            if (check.Count > 0)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client aleayde has suvscitpions");


            var clientSubscriptionEntity = new ClientsSubscriptionsEntity
            {
                ClientId = clientEntity.ID,
                IsCurrent = true,
                StartDate = DateTimeOffset.Now,
                SubscriptionId = subscriptionsId,
                EndDate = DateTimeOffset.Now.AddHours(subscriptionEntity.Period),
                OrgignalPeriod = subscriptionEntity.Period
            };

            _clientSubscriptionRepository.Add(clientSubscriptionEntity);
            await _clientSubscriptionRepository.SaveChangesAsync();

            var dueEntity = new ClientDueEntity
            {
                Amount = subscriptionEntity.Cost,
                Reason = $"اشتراك لمدة {subscriptionEntity.Period / 24} يوم",
                DueDate = DateTimeOffset.Now,
                ClientId = clientEntity.ID
            };

            _dueRepository.Add(dueEntity);
            await _dueRepository.SaveChangesAsync();

            clientEntity.UpdatedBy = "Jo Aqra";
            clientEntity.UpdatedOn = DateTimeOffset.Now;

            _repository.Update(clientEntity);
            await _repository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> DeleteClientSubscriptions(string clientId, long id)
        {
            var clientEntity = await _repository.FirstOrDefault(
           x => x.clientId == clientId,
           clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");


            var clientSubscriptionEntity = await _clientSubscriptionRepository.FirstOrDefault(x => x.ID == id);

            _clientSubscriptionRepository.Remove(clientSubscriptionEntity);
            await _clientSubscriptionRepository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> PuauseClientSubscription(string clientId, long subscriptionsId, long id)
        {
            var clientEntity = await _repository.FirstOrDefault(
            x => x.clientId == clientId,
            clientsIncldues);

            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var subscriptionEntity = await _subscriptionRepository.FirstOrDefault(x => x.ID == subscriptionsId);

            if (subscriptionEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"subscriptionEntity with ID {subscriptionsId} not found");


            var clientSubscriptionEntity = await _clientSubscriptionRepository.FirstOrDefault(x => x.ID == id);

            clientSubscriptionEntity.IsPause = true;
            clientSubscriptionEntity.PuaseTime = DateTimeOffset.Now;

            _clientSubscriptionRepository.Update(clientSubscriptionEntity);
            await _clientSubscriptionRepository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> AddClientPayment(string clientId, PaymentModel model)
        {
            var clientEntity = await _repository.FirstOrDefault(
           x => x.clientId == clientId,
           clientsIncldues);


            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = new ClientPaymentEntity
            {
                Amount = model.Amount,
                ClientId = clientEntity.ID,
                PyamentDate = DateTimeOffset.Now
            };

            _paymentRepository.Add(entity);
            await _paymentRepository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> UpdateClientPayment(string clientId, long paymentId, PaymentModel model)
        {
            var clientEntity = await _repository.FirstOrDefault(
          x => x.clientId == clientId,
          clientsIncldues);


            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = await _paymentRepository.FirstOrDefault(x => x.ID == paymentId);

            entity.Amount = model.Amount;

            _paymentRepository.Update(entity);
            await _paymentRepository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }

        public async Task<ClientResource> deleteClientPayment(string clientId, long paymentId)
        {
            var clientEntity = await _repository.FirstOrDefault(
                x => x.clientId == clientId,
                 clientsIncldues);


            if (clientEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Client with ID {clientId} not found");

            var entity = await _paymentRepository.FirstOrDefault(x => x.ID == paymentId);


            _paymentRepository.Remove(entity);
            await _paymentRepository.SaveChangesAsync();

            return entityToResource(clientEntity);
        }
    }

}
