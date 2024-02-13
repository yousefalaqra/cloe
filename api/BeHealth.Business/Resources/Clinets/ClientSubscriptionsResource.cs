using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Clinets
{
    public class ClientSubscriptionsResource
    {
        public long ID { get; set; }

        public DateTimeOffset StartTime { get; set; }

        public DateTimeOffset EndTime { get; set; }

        public bool IsPause { get; set; }
        public DateTimeOffset? PauseTime { get; set; }

        public int OriginalPeriod { get; set; }

        public bool IsCurrent { get; set; }
    }
}
