using BeHealth.Business.Models.FoodManamgnet.Nutrition;
using BeHealth.Presentence.Enums;
using System.Collections.Generic;

namespace BeHealth.Business.Models.FoodManamgnet.FoodItems
{
    public class FoodItemModel
    {
        public string Name { get; set; }
       
        public string Note { get; set; }

        public double Fat { get; set; }

        public double Carbohydrates { get; set; }

        public double Protein { get; set; }

        public double Calories { get; set; }

        public double BaseQuantity { get; set; }

        public long UnitId { get; set; }

        public int Group { get; set; }
    }
}
