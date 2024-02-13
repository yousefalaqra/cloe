using BeHealth.Presentence.Entities.Organization;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Organization
{
    public class OrganizationResource
    {
        public string OrganizationId { get; set; }

        public string Title { get; set; }

        public string Email { get; set; }

        public IList<WorkPlaceEntity> WorkPlaceEntities { get; set; }
    }
}
