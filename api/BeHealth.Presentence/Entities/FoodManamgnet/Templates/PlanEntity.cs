using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Templates
{
    public class PlanEntity : BaseEntity
    {
        public IList<DayEntity> Days { get; set; }

        [ForeignKey("TemplateEntity")]
        public long TemplateId { get; set; }
        public TemplateEntity TemplateEntity { get; set; }

        public IList<MealEntity> MealsEntities { get; set; }
    }
}
