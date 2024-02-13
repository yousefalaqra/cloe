using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Plans
{
    [Table("Plans")]
    public class PlanEntity : BaseEntity
    {
        [StringLength(30)]
        public string NameAR { get; set; }

        [StringLength(30)]
        public string NameEN { get; set; }

        public string Note { get; set; }
    }
}
