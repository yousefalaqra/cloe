using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Organization
{
    public class WorkPlaceEntity : TrackableEntity
    {
        public string Title { get; set; }


        [ForeignKey("OrganizationEntity")]
        public long OrganizationId { get; set; }

        public OrganizationEntity OrganizationEntity { get; set; }

        public IList<UserWorkplaceEntity> UserWorkplaceEntities { get; set; }
        public IList<ClientWorkplaceEntity> ClientWorkplaceEntities { get; set; }
    }
}
