using BeHealth.Business.Resources.FoodManamgnet.Meals;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.FoodManamgnet.Templates
{
    public class MealResource
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public DateTimeOffset Time { get; set; }

        public List<RecipeResource> Recipes { get; set; }
        public List<MealFoodItemResource> Items { get; set; }

        public double Fat { get; set; }
        public double Energy { get; set; }
        public double Protien { get; set; }
        public double Carbs { get; set; }
    }
}
