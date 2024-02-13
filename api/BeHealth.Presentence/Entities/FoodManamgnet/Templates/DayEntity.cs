using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Templates
{
    public class DayEntity : BaseEntity
    {
        public DayType Day { get; set; }

        [ForeignKey("PlanEntity")]
        public long PlanId { get; set; }
        public PlanEntity PlanEntity { get; set; }
    }
}
