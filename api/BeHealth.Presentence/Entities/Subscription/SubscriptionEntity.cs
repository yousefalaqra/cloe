using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Entities.Subscription
{
    public class SubscriptionEntity : BaseEntity
    {
        public int Period { get; set; }

        public double Cost { get; set; }

        public bool Disabled { get; set; }

        public IList<ClientsSubscriptionsEntity> ClientsSubscriptions { get; set; }


    }
}
