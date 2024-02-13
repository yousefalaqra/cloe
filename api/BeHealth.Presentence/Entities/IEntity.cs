using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Entities
{
    public interface IEntity
    {
        long ID { get; set; }
    }

    public interface ITrackable
    {
        string CreatedBy { get; set; }

        DateTimeOffset CreatedAt { get; set; }

        string UpdatedBy { get; set; }

        DateTimeOffset? UpdatedOn { get; set; }
    }
}
