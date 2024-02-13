using BeHealth.Presentence.Entities.Organization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Subscription
{
   public class ClientDueEntity : BaseEntity
    {
        public double Amount { get; set; }

        public DateTimeOffset DueDate { get; set; }

        public string Reason { get; set; }

        [ForeignKey("ClientEntity")]
        public long ClientId { get; set; }
        public ClientEntity ClientEntity { get; set; }

    }
}
