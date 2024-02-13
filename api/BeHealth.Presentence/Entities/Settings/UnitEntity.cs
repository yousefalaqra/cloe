using BeHealth.Presentence.Entities.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Settings
{
    [Table("Units")]
    public class UnitEntity : BaseEntity
    {
        [StringLength(15)]
        public string Code { get; set; }

        public double GramsRatio { get; set; }

        public bool IsLiquid { get; set; }

    }
}
