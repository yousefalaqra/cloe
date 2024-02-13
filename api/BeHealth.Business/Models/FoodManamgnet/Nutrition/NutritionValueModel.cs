using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.FoodManamgnet.Nutrition
{
    public class NutritionValueModel
    {
        public double Fat { get; set; }

        public double Carbohydrates { get; set; }

        public double Protein { get; set; }

        public double Calories { get; set; }

        public double BaseQuantity { get; set; }

        public long UnitId { get; set; }
    }
}
