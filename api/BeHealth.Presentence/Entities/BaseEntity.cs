using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Entities
{
    public class BaseEntity : IEntity
    {
        public long ID { get; set; }
    }

    public class TrackableEntity: IEntity, ITrackable
    {
        public long ID { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTimeOffset? UpdatedOn { get; set; } 
    }
}
