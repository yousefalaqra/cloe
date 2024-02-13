using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Clinets
{
    public class ClientPaymentResource
    {
        public long ID { get; set; }

        public double Amount { get; set; }

        public DateTimeOffset PaymentDate { get; set; }
    }
}
