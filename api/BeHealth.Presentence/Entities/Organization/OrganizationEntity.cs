using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Entities.Organization
{
    public class OrganizationEntity : TrackableEntity
    {
        public string OrganizationId { get; set; }

        public string Title { get; set; }

        public string Email { get; set; }

        public IList<WorkPlaceEntity> WorkPlaceEntities { get; set; }

    }
}
