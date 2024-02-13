using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models
{
    public class AppointmentModel
    {
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }

        public AppointmentStatus Status { get; set; }
    }
}
