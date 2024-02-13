using BeHealth.Business.Resources.FoodManamgnet.Recipes;
using BeHealth.Business.Resources.Settings;
using System;
using System.Collections.Generic;

namespace BeHealth.Business.Resources.FoodManamgnet.Meals
{
    public class RecipeResource : TrackableResource
    {
        public long ID { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset? PreparationTime { get; set; }

        public double Fat { get; set; }
        public double Energy { get; set; }
        public double Protien { get; set; }
        public double Carbs { get; set; }

        public List<RecipeStepsResource> Steps { get; set; }
        public List<RecipeCategoryResource> Categories { get; set; }
        public List<RecipeIngredientResource> Ingredients { get; set; }

    }
}
