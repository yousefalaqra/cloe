using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Organization
{
    public class ClientWorkplaceEntity
    {
        [ForeignKey("WorkPlaceEntity")]
        public long WorkplaceId { get; set; }
        public WorkPlaceEntity WorkPlaceEntity { get; set; }

        [ForeignKey("ClientEntity")]
        public long ClientId { get; set; }
        public ClientEntity ClientEntity { get; set; }

    }
}
