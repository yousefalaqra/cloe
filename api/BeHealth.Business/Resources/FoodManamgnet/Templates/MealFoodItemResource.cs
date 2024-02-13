using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.FoodManamgnet.Templates
{
    public class MealFoodItemResource
    {
        public long foodItemId { get; set; }

        public long MealId { get; set; }

        public string FoodItemName { get; set; }

        public double Quantity { get; set; }

        public long UnitId { get; set; }

        public string UnitCode { get; set; }
    }
}
