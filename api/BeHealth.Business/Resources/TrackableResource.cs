using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources
{
    public class TrackableResource
    {
        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTimeOffset? UpdatedOn { get; set; }
    }
}
