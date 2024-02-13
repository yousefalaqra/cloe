using BeHealth.Business.Models.Subscription;
using BeHealth.Business.Resources.Subscirption;
using BeHealth.Presentence.Entities.Subscription;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface ISubscriptionManager
    {
        Task<SubscriptionResource> AddSubscription(SubscriptionModel model);
        Task<List<SubscriptionResource>> GetAllSubscritions(bool active);
        Task<IncomeResource> GetIncome();

        Task<bool> AttachClientSub(long clientId, long subId);

        Task<SubscriptionResource> UpdateSubscruotionState(long id);

    }
    public class SubscriptionManager : ISubscriptionManager
    {
        private readonly IRepository<SubscriptionEntity> _repository;
        private readonly IClientsSubscriptionsRepository _subscriptionsRepository;
        private readonly IClientManager _clientManager;

        public SubscriptionManager(
            IRepository<SubscriptionEntity> repository,
            IClientsSubscriptionsRepository subscriptionsRepository,
            IClientManager clientManager)
        {
            _repository = repository;
            _clientManager = clientManager;
            _subscriptionsRepository = subscriptionsRepository;
        }

        public async Task<SubscriptionResource> AddSubscription(SubscriptionModel model)
        {
            var entity = new SubscriptionEntity
            {
                Period = model.Period,
                Cost = model.Cost,
                Disabled = false,

            };

            var createdEntity = _repository.Add(entity);
            await _repository.SaveChangesAsync();


            SubscriptionResource resource = BuildResource(createdEntity);

            return resource;
        }

        public async Task<bool> AttachClientSub(long clientId, long subId)
        {
            var entity = new ClientsSubscriptionsEntity
            {
                ClientId = clientId,
                SubscriptionId = subId
            };

            _subscriptionsRepository.AttachClientSubscription(entity);
            await _subscriptionsRepository.SaveChangesAsync();

            return true;
        }

        public async Task<List<SubscriptionResource>> GetAllSubscritions(bool active)
        {
            Expression<Func<SubscriptionEntity, bool>> predicate = null;

            if (active == true)
            {
                predicate = x => x.Disabled == false;
            }

            var entities = await _repository.GetAllAsync(predicate);

            List<SubscriptionResource> resources = new List<SubscriptionResource>();

            foreach (var entity in entities)
            {
                SubscriptionResource resource = BuildResource(entity);
                resources.Add(resource);

            }

            return resources;
        }

        public async Task<IncomeResource> GetIncome()
        {
            var clients = await _clientManager.GetAll();

            var incermantalIncome = 0.0;
            var incermantalPaidIncome = 0.0;
            var incermantalDeptIncome = 0.0;


            foreach (var client in clients)
            {

                foreach (var item in client.Payments)
                {
                    incermantalPaidIncome += item.Amount;
                }

                foreach (var item in client.Dues)
                {
                    incermantalDeptIncome += item.Amount;
                }
            }

            var result = new IncomeResource
            {
                DebtsIncome = incermantalDeptIncome,
                PaidIncome = incermantalPaidIncome,
                TotalIncome = incermantalDeptIncome + incermantalPaidIncome,
            };

            return result;
        }

        public async Task<SubscriptionResource> UpdateSubscruotionState(long id)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id);

            if (entity == null)
                throw new Exception("Not found");

            entity.Disabled = !entity.Disabled;

            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            return BuildResource(entity);
        }

        private SubscriptionResource BuildResource(SubscriptionEntity entity)
        {
            var result = new SubscriptionResource
            {
                ID = entity.ID,
                Period = entity.Period,
                Cost = entity.Cost,
                Disabled = entity.Disabled,
            };

            return result;
        }
    }
}
