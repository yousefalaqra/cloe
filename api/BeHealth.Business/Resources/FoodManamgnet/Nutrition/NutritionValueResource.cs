using BeHealth.Business.Resources.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.FoodManamgnet.Nutrition
{
    public class NutritionValueResource
    {
        public long ID { get; set; }

        public double Fat { get; set; }

        public double Carbohydrates { get; set; }

        public double Protein { get; set; }

        public double Calories { get; set; }

        public double BaseQuantity { get; set; }

        public UnitResource Unit { get; set; }
    }
}
