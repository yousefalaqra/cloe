using BeHealth.Presentence.Entities.Clients;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Locations
{
    [Table("Governorates")]
    public class GovernorateEntity : BaseEntity
    {     
        [Column("Governorate_Name_AR")]
        [StringLength(10)]
        public string GovernorateNameAR { get; set; }

        [Column("Governorate_Name_EN")]
        [StringLength(10)]
        public string GovernorateNameEN { get; set; }

        //public List<ClientLoactionEntity> ClientLoactionEntities { get; set; }

    }
}
