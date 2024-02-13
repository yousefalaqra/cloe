using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Entities.Organization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Subscription
{
    public class ClientsSubscriptionsEntity : BaseEntity
    {
        [ForeignKey("SubscriptionEntity")]
        public long SubscriptionId { get; set; }
        public SubscriptionEntity SubscriptionEntity { get; set; }

        [ForeignKey("ClientEntity")]
        public long ClientId { get; set; }
        public ClientEntity ClientEntity { get; set; }

        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }

        public bool IsCurrent { get; set; }

        public bool IsPause { get; set; }

        public int OrgignalPeriod { get; set; }
        public DateTimeOffset? PuaseTime { get; set; }
    }
}
