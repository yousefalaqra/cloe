using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Entities.Settings;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Clients
{
    public class ClientsDiseasesEntity : BaseEntity
    {
        [Column("Client_ID")]
        public long ClientID { get; set; }
        public ClientEntity Client { get; set; }

        [Column("Disease_Name")]
        [StringLength(20)]
        public string DiseaseName { get; set; }
    }
}
