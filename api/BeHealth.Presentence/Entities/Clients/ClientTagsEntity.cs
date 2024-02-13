using BeHealth.Presentence.Entities.Organization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Clients
{
    public class ClientTagsEntity : BaseEntity
    {
        public string Tag { get; set; }

        [ForeignKey("ClientEntity")]
        public long ClientId { get; set; }
        public ClientEntity ClientEntity { get; set; }

    }
}
