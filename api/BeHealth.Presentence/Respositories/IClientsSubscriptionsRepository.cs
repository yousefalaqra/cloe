using BeHealth.Presentence.Entities.Subscription;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BeHealth.Presentence.Respositories
{
    public interface IClientsSubscriptionsRepository
    {
        void AttachClientSubscription(ClientsSubscriptionsEntity entity);
        void DetachClientSubscription(ClientsSubscriptionsEntity entity);

        void AddPayment(ClientPaymentEntity entity);

        Task<SubscriptionEntity> GetClientsSubscription(long clientId);

        Task<List<ClientPaymentEntity>> GetClientPayments(long clientId);

        Task<int> SaveChangesAsync();

    }

    public class ClientsSubscriptionsRepository : IClientsSubscriptionsRepository
    {
        private readonly BeHealthDBContext _context;

        public ClientsSubscriptionsRepository(BeHealthDBContext context)
        {
            _context = context;
        }

        public void AddPayment(ClientPaymentEntity entity)
        {
            throw new NotImplementedException();
        }

        public void AttachClientSubscription(ClientsSubscriptionsEntity entity)
        {
            throw new NotImplementedException();
        }

        public void DetachClientSubscription(ClientsSubscriptionsEntity entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<ClientPaymentEntity>> GetClientPayments(long clientId)
        {
            throw new NotImplementedException();
        }

        public Task<SubscriptionEntity> GetClientsSubscription(long clientId)
        {
            throw new NotImplementedException();
        }

        //public void AddPayment(ClientSubscriptionPaymentEntity entity)
        //{
        //    _context.ClientSubscriptionPayments.Add(entity);
        //}

        //public void AttachClientSubscription(ClientsSubscriptionsEntity entity)
        //{
        //    _context.ClientsSubscriptions.Add(entity);
        //}

        //public void DetachClientSubscription(ClientsSubscriptionsEntity entity)
        //{
        //    _context.ClientsSubscriptions.Remove(entity);
        //}

        //public Task<List<ClientSubscriptionPaymentEntity>> GetClientPayments(long clientId)
        //{
        //    var result = (from payment in _context.ClientSubscriptionPayments
        //                  where payment.ClientsSubscriptionsEntity.ClientId == clientId
        //                  select payment).ToListAsync();

        //    return result;
        //}

        //public Task<SubscriptionEntity> GetClientsSubscription(long clientId)
        //{
        //    var result = (from subs in _context.Subscriptions
        //                  where subs.ClientsSubscriptionsEntities.Any(i => i.ClientId == clientId)
        //                  select subs).FirstOrDefaultAsync();

        //    return result;
        //}

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
