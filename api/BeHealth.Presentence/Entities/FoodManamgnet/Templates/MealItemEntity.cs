using BeHealth.Presentence.Entities.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Templates
{
    public class MealItemEntity : BaseEntity
    {
        [ForeignKey("MealEntity")]
        public long MealId { get; set; }

        public MealEntity MealEntity { get; set; }


        [ForeignKey("FoodItem")]
        public long ItemId { get; set; }
        public FoodItemEntity FoodItem { get; set; }

        public string Name { get; set; }

        public double Quantity { get; set; }

        public long UnitId { get; set; }
    }
}
