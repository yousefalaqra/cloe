using BeHealth.Business.Resources.FoodManamgnet.FoodItems;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.FoodManamgnet.Meals
{
    public class RecipeIngredientResource
    {
        public long foodItemId { get; set; }

        public long RecipeId { get; set; }

        public string FoodItemName { get; set; }

        public double Quantity { get; set; }

        public long UnitId { get; set; }

        public string UnitCode { get; set; }

    }
}
