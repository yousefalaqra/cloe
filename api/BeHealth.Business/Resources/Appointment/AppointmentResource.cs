using BeHealth.Business.Resources.Clinets;
using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Appointment
{
    public class AppointmentResource
    {
        public long ID { get; set; }

        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }

        public AppointmentStatus Status { get; set; }

        public ClientResource Client { get; set; }
    }
}
