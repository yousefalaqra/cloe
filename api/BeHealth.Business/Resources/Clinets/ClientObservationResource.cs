using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Clinets
{
    public class ClientObservationResource
    {
        public long ID { get; set; }

        public DateTime ObservationDate { get; set; }

        public string Observation { get; set; }
    }
}
