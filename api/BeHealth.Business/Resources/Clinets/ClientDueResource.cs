using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Clinets
{
    public class ClientDueResource
    {
        public long ID { get; set; }

        public double Amount { get; set; }

        public string Reason { get; set; }

        public DateTimeOffset DueDate { get; set; }
    }
}
