using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Subscription
{
    public class ClientPaymentEntity : BaseEntity
    {
        public double Amount { get; set; }

        public DateTimeOffset PyamentDate { get; set; }

        [ForeignKey("ClientEntity")]
        public long ClientId { get; set; }
        public ClientEntity ClientEntity { get; set; }
    }
}
