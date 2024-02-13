using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models
{
    public class TrackableModel
    {
        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTimeOffset? UpdatedOn { get; set; }
    }
}

