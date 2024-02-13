using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Templates
{
    public class MealEntity : BaseEntity
    {
        public string Name { get; set; }

        public DateTimeOffset Time { get; set; }

        [ForeignKey("PlanEntity")]
        public long PlanId { get; set; }
        public PlanEntity PlanEntity { get; set; }

        public List<MealRecipeEntity> Recipes { get; set; }
        public List<MealItemEntity> Items { get; set; }
    }
}
