using BeHealth.Presentence.Entities.Organization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Clients
{
    public class ClientObservationsEntity : BaseEntity
    {
        public DateTime ObservationDate { get; set; }

        public string Observation { get; set; }

        [Column("Client_ID")]
        [ForeignKey("Client")]
        public long ClientID { get; set; }
        public ClientEntity Client { get; set; }
    }
}
